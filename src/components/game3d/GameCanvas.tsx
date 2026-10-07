import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { Mission, MissionObjective, PlayerProgress, GameSettings } from '../../types/game';
import { CharacterModel } from './CharacterModel';
import { EnvironmentBuilder, InteractiveObject } from './EnvironmentBuilder';
import { audioService } from '../../services/audioService';
import { WARDROBE_OUTFITS } from '../../data/missions';

interface GameCanvasProps {
  mission: Mission;
  settings: GameSettings;
  progress: PlayerProgress;
  onObjectiveProgress: (objectiveId: string, current: number, completed: boolean) => void;
  onOpenQuiz: () => void;
  onMissionComplete: () => void;
  joystickVector: { x: number; y: number };
  isSprinting: boolean;
  actionTriggered: number; // counter incremented when action pressed
  jumpTriggered: number;
  namasteTriggered: number;
  onActionStatusChange: (isAvailable: boolean, label: string) => void;
}

export const GameCanvas: React.FC<GameCanvasProps> = ({
  mission,
  settings,
  progress,
  onObjectiveProgress,
  onOpenQuiz,
  onMissionComplete,
  joystickVector,
  isSprinting,
  actionTriggered,
  jumpTriggered,
  namasteTriggered,
  onActionStatusChange,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  // Three.js instances
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const characterRef = useRef<CharacterModel | null>(null);
  const envBuilderRef = useRef<EnvironmentBuilder | null>(null);

  // Gameplay State
  const playerPosRef = useRef(new THREE.Vector3(0, 0, 8));
  const playerVelocityRef = useRef(new THREE.Vector3(0, 0, 0));
  const isGroundedRef = useRef(true);
  const playerRotationYRef = useRef(0);
  const nearestObjectRef = useRef<InteractiveObject | null>(null);

  // Transient animation actions
  const isSweepingRef = useRef(false);
  const isPlantingRef = useRef(false);
  const isPerformingNamasteRef = useRef(false);

  // Objectives tracking in current level
  const levelObjectivesRef = useRef<Record<string, number>>({});

  // Helper to get current outfit colors
  const outfit = WARDROBE_OUTFITS.find((o) => o.id === progress.currentOutfitId) || WARDROBE_OUTFITS[0];

  // Initialize Scene, Camera, Lights, and Loop
  useEffect(() => {
    if (!mountRef.current) return;

    // Reset objectives count
    mission.objectives.forEach((obj) => {
      levelObjectivesRef.current[obj.id] = 0;
    });

    const width = mountRef.current.clientWidth || window.innerWidth;
    const height = mountRef.current.clientHeight || window.innerHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x87CEEB); // Sky blue
    scene.fog = new THREE.FogExp2(0x87CEEB, 0.015);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 200);
    cameraRef.current = camera;
    camera.position.set(0, 5, 14);

    // 3. Renderer with antialias and shadows
    const renderer = new THREE.WebGLRenderer({
      antialias: settings.graphicsQuality !== 'low',
      powerPreference: 'high-performance',
    });
    rendererRef.current = renderer;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, settings.graphicsQuality === 'high' ? 2 : 1.5));
    renderer.shadowMap.enabled = settings.graphicsQuality !== 'low';
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);

    // 4. Lights
    const hemiLight = new THREE.HemisphereLight(0xFFFFFF, 0x444444, 0.85);
    scene.add(hemiLight);

    const sunLight = new THREE.DirectionalLight(0xFFF2D6, 1.2);
    sunLight.position.set(25, 45, 20);
    if (settings.graphicsQuality !== 'low') {
      sunLight.castShadow = true;
      sunLight.shadow.mapSize.width = 1024;
      sunLight.shadow.mapSize.height = 1024;
      sunLight.shadow.camera.near = 0.5;
      sunLight.shadow.camera.far = 100;
      sunLight.shadow.camera.left = -30;
      sunLight.shadow.camera.right = 30;
      sunLight.shadow.camera.top = 30;
      sunLight.shadow.camera.bottom = -30;
    }
    scene.add(sunLight);

    // 5. Build Environment for this mission
    const envBuilder = new EnvironmentBuilder(scene);
    envBuilderRef.current = envBuilder;
    const { spawnPoint } = envBuilder.buildLevel(mission);
    playerPosRef.current.copy(spawnPoint);

    // 6. Character Model
    const character = new CharacterModel(outfit.vestColor, outfit.kurtaColor);
    characterRef.current = character;
    character.group.position.copy(playerPosRef.current);
    scene.add(character.group);

    // 7. Resize Handler
    const handleResize = () => {
      if (!mountRef.current || !renderer || !camera) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 8. Main Game Loop
    let animationFrameId: number;
    let lastTime = performance.now();

    const animateLoop = (time: number) => {
      animationFrameId = requestAnimationFrame(animateLoop);

      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Update environment animations (water ripple, flags, sparkles)
      envBuilder.update(delta);

      // Character Physics & Movement
      const moveX = joystickVector.x;
      const moveZ = joystickVector.y;
      const isInputMoving = Math.abs(moveX) > 0.05 || Math.abs(moveZ) > 0.05;

      const baseSpeed = isSprinting ? 7.5 : 4.5;

      if (isInputMoving && !isSweepingRef.current && !isPlantingRef.current && !isPerformingNamasteRef.current) {
        // Calculate target rotation from joystick angle
        const targetAngle = Math.atan2(moveX, moveZ);
        playerRotationYRef.current = THREE.MathUtils.lerp(
          playerRotationYRef.current,
          targetAngle,
          delta * 12
        );
        character.group.rotation.y = playerRotationYRef.current;

        // Apply forward velocity
        const forwardX = Math.sin(targetAngle) * baseSpeed;
        const forwardZ = Math.cos(targetAngle) * baseSpeed;

        playerPosRef.current.x += forwardX * delta;
        playerPosRef.current.z += forwardZ * delta;

        // Boundary Clamping (Stay within game arena ~ 35m)
        playerPosRef.current.x = THREE.MathUtils.clamp(playerPosRef.current.x, -28, 28);
        playerPosRef.current.z = THREE.MathUtils.clamp(playerPosRef.current.z, -28, 28);
      }

      // Vertical Gravity & Jump
      if (!isGroundedRef.current) {
        playerVelocityRef.current.y -= 18 * delta; // gravity
        playerPosRef.current.y += playerVelocityRef.current.y * delta;
        if (playerPosRef.current.y <= 0) {
          playerPosRef.current.y = 0;
          playerVelocityRef.current.y = 0;
          isGroundedRef.current = true;
        }
      }

      character.group.position.x = playerPosRef.current.x;
      character.group.position.y = playerPosRef.current.y;
      character.group.position.z = playerPosRef.current.z;

      // Character Animation
      character.animate(delta, {
        isMoving: isInputMoving,
        isRunning: isSprinting && isInputMoving,
        isJumping: !isGroundedRef.current,
        isPerformingNamaste: isPerformingNamasteRef.current,
        isSweeping: isSweepingRef.current,
        isPlanting: isPlantingRef.current,
        speed: baseSpeed,
      });

      // Camera Follows Character Smoothly
      const camTargetX = playerPosRef.current.x;
      const camTargetZ = playerPosRef.current.z + 7.5;
      const camTargetY = playerPosRef.current.y + 4.2;

      camera.position.x = THREE.MathUtils.lerp(camera.position.x, camTargetX, delta * 5);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, camTargetY, delta * 5);
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, camTargetZ, delta * 5);

      camera.lookAt(
        playerPosRef.current.x,
        playerPosRef.current.y + 1.2,
        playerPosRef.current.z
      );

      // Check Proximity to Interactive Objects
      let closest: InteractiveObject | null = null;
      let minDistance = Infinity;

      for (const obj of envBuilder.interactiveObjects) {
        if (obj.completed) continue;
        const d = playerPosRef.current.distanceTo(obj.position);
        if (d < obj.radius && d < minDistance) {
          minDistance = d;
          closest = obj;
        }
      }

      nearestObjectRef.current = closest;

      // Update guided citizens following PM Modi
      for (const obj of envBuilder.interactiveObjects) {
        if (obj.type === 'citizen' && obj.metadata?.isFollowing && !obj.metadata?.reachedCamp) {
          // Citizen follows PM Modi at a distance of ~1.8m
          const targetPos = playerPosRef.current.clone().add(new THREE.Vector3(1.2, 0, 1.2));
          obj.mesh.position.lerp(targetPos, delta * 3.5);
          obj.position.copy(obj.mesh.position);

          // Check if citizen reached wellness camp checkpoint
          const campObj = envBuilder.interactiveObjects.find((o) => o.type === 'checkpoint');
          if (campObj && obj.position.distanceTo(campObj.position) < 3.2) {
            obj.metadata.reachedCamp = true;
            obj.metadata.isFollowing = false;
            obj.completed = true;
            audioService.playCollectTrash();

            // Find guide objective and increment
            const guideObj = mission.objectives.find((o) => o.type === 'guide_citizen');
            if (guideObj) {
              const current = (levelObjectivesRef.current[guideObj.id] || 0) + 1;
              levelObjectivesRef.current[guideObj.id] = current;
              onObjectiveProgress(guideObj.id, current, current >= guideObj.required);
              checkAllObjectivesComplete();
            }
          }
        }
      }

      // Action button hint label updater
      if (closest) {
        let label = 'ACTION';
        if (closest.type === 'trash') label = 'CLEAN';
        else if (closest.type === 'soil') label = 'PLANT';
        else if (closest.type === 'citizen') label = closest.metadata?.needsGuide ? 'GUIDE' : 'NAMASTE';
        else if (closest.type === 'solar') label = 'ACTIVATE';
        else if (closest.type === 'quiz_kiosk') label = 'QUIZ';
        onActionStatusChange(true, label);
      } else {
        onActionStatusChange(false, 'ACTION');
      }

      renderer.render(scene, camera);
    };

    animateLoop(performance.now());

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [mission, settings.graphicsQuality, outfit.vestColor, outfit.kurtaColor]);

  // Handle Jump Event
  useEffect(() => {
    if (jumpTriggered > 0 && isGroundedRef.current) {
      isGroundedRef.current = false;
      playerVelocityRef.current.y = 7.0; // Jump impulse
    }
  }, [jumpTriggered]);

  // Handle Namaste Event
  useEffect(() => {
    if (namasteTriggered > 0) {
      isPerformingNamasteRef.current = true;
      setTimeout(() => {
        isPerformingNamasteRef.current = false;
      }, 1200);

      // Check if near any citizen who has talk objective
      const targetObj = nearestObjectRef.current;
      if (targetObj && targetObj.type === 'citizen' && !targetObj.completed) {
        targetObj.completed = true;
        // Make citizen wave back
        if (targetObj.metadata?.sprite) {
          targetObj.metadata.sprite.scale.set(1.1, 1.1, 1.1);
        }
        audioService.playNamasteGreeting();

        const talkObj = mission.objectives.find((o) => o.type === 'talk_citizen');
        if (talkObj) {
          const current = (levelObjectivesRef.current[talkObj.id] || 0) + 1;
          levelObjectivesRef.current[talkObj.id] = current;
          onObjectiveProgress(talkObj.id, current, current >= talkObj.required);
          checkAllObjectivesComplete();
        }
      }
    }
  }, [namasteTriggered]);

  // Helper to test if all objectives are fulfilled
  const checkAllObjectivesComplete = () => {
    const allDone = mission.objectives.every((obj) => {
      const cur = levelObjectivesRef.current[obj.id] || 0;
      return cur >= obj.required;
    });
    if (allDone) {
      setTimeout(() => {
        onMissionComplete();
      }, 600);
    }
  };

  // Handle Action Trigger (Interacting with Trash, Planting Tree, Talking, Activating Solar, Quiz)
  useEffect(() => {
    if (actionTriggered === 0) return;

    const targetObj = nearestObjectRef.current;
    if (!targetObj || targetObj.completed) return;

    if (targetObj.type === 'trash') {
      // 1. Clean Litter
      isSweepingRef.current = true;
      audioService.playCollectTrash();
      targetObj.completed = true;
      targetObj.mesh.visible = false;

      const trashObj = mission.objectives.find((o) => o.type === 'collect_trash');
      if (trashObj) {
        const cur = (levelObjectivesRef.current[trashObj.id] || 0) + 1;
        levelObjectivesRef.current[trashObj.id] = cur;
        onObjectiveProgress(trashObj.id, cur, cur >= trashObj.required);
        checkAllObjectivesComplete();
      }

      setTimeout(() => {
        isSweepingRef.current = false;
      }, 600);

    } else if (targetObj.type === 'soil') {
      // 2. Plant Tree Sapling
      isPlantingRef.current = true;
      audioService.playPlantTree();
      targetObj.completed = true;

      // Transform soil into growing tree mesh
      targetObj.mesh.clear();
      const trunkMat = new THREE.MeshLambertMaterial({ color: 0x5D4037 });
      const leavesMat = new THREE.MeshLambertMaterial({ color: 0x2E7D32 });
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.25, 1.8), trunkMat);
      trunk.position.y = 0.9;
      targetObj.mesh.add(trunk);

      const foliage = new THREE.Mesh(new THREE.SphereGeometry(1.2, 8, 8), leavesMat);
      foliage.position.y = 2.4;
      targetObj.mesh.add(foliage);

      const plantObj = mission.objectives.find((o) => o.type === 'plant_tree');
      if (plantObj) {
        const cur = (levelObjectivesRef.current[plantObj.id] || 0) + 1;
        levelObjectivesRef.current[plantObj.id] = cur;
        onObjectiveProgress(plantObj.id, cur, cur >= plantObj.required);
        checkAllObjectivesComplete();
      }

      setTimeout(() => {
        isPlantingRef.current = false;
      }, 700);

    } else if (targetObj.type === 'solar') {
      // 3. Activate Solar Lamp
      targetObj.completed = true;
      audioService.playButtonClick();
      if (targetObj.metadata?.lampMat) {
        targetObj.metadata.lampMat.color.set(0xFACC15); // Glow bright yellow
      }

      const solarObj = mission.objectives.find((o) => o.type === 'activate_solar');
      if (solarObj) {
        const cur = (levelObjectivesRef.current[solarObj.id] || 0) + 1;
        levelObjectivesRef.current[solarObj.id] = cur;
        onObjectiveProgress(solarObj.id, cur, cur >= solarObj.required);
        checkAllObjectivesComplete();
      }

    } else if (targetObj.type === 'citizen') {
      // 4. Citizen Interaction
      if (targetObj.metadata?.needsGuide) {
        // Guide to clinic
        targetObj.metadata.isFollowing = true;
        audioService.playButtonClick();
      } else {
        // Greet citizen
        isPerformingNamasteRef.current = true;
        audioService.playNamasteGreeting();
        targetObj.completed = true;

        const talkObj = mission.objectives.find((o) => o.type === 'talk_citizen');
        if (talkObj) {
          const cur = (levelObjectivesRef.current[talkObj.id] || 0) + 1;
          levelObjectivesRef.current[talkObj.id] = cur;
          onObjectiveProgress(talkObj.id, cur, cur >= talkObj.required);
          checkAllObjectivesComplete();
        }

        setTimeout(() => {
          isPerformingNamasteRef.current = false;
        }, 1000);
      }

    } else if (targetObj.type === 'quiz_kiosk') {
      // 5. Open Educational Quiz Dialog
      audioService.playButtonClick();
      onOpenQuiz();
    }
  }, [actionTriggered]);

  return <div ref={mountRef} className="w-full h-full absolute inset-0 overflow-hidden" />;
};
