import * as THREE from 'three';
import { Mission } from '../../types/game';

export interface InteractiveObject {
  id: string;
  type: 'trash' | 'soil' | 'citizen' | 'solar' | 'checkpoint' | 'quiz_kiosk';
  mesh: THREE.Group;
  position: THREE.Vector3;
  radius: number;
  completed: boolean;
  metadata?: any;
}

export class EnvironmentBuilder {
  private scene: THREE.Scene;
  public interactiveObjects: InteractiveObject[] = [];
  private animatedElements: Array<{ update: (delta: number) => void }> = [];

  constructor(scene: THREE.Scene) {
    this.scene = scene;
  }

  public clear() {
    this.interactiveObjects = [];
    this.animatedElements = [];
  }

  public buildLevel(mission: Mission): { spawnPoint: THREE.Vector3 } {
    this.clear();

    const theme = mission.environmentTheme;
    const spawnPoint = new THREE.Vector3(0, 0, 8);

    // 1. Sky & Ground
    this.buildGroundAndSky(theme);

    // 2. Thematic Landmark Monuments & Cityscape
    this.buildThemeLandmarks(theme);

    // 3. Roads, Pathways & Decorative Trees/Flags
    this.buildRoadsAndDecorations(theme);

    // 4. Mission Interactive Spawns (Trash, Soil, Citizens, Solar Kiosks)
    this.spawnMissionInteractives(mission);

    return { spawnPoint };
  }

  private buildGroundAndSky(theme: string) {
    let groundColor = 0x2E6930; // Grass green
    let pathColor = 0x8C8D8E; // Pavement

    if (theme === 'rajasthan') {
      groundColor = 0xD4A373; // Sandstone amber
    } else if (theme === 'chennai' || theme === 'mumbai') {
      groundColor = 0xE0C9A6; // Beach sand / promenade
    } else if (theme === 'himalayas') {
      groundColor = 0x3E5A44; // Alpine alpine meadow
    }

    // Main Ground Plane
    const groundGeo = new THREE.PlaneGeometry(160, 160);
    const groundMat = new THREE.MeshLambertMaterial({ color: groundColor });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.receiveShadow = true;
    this.scene.add(groundMesh);

    // Stone / Cobblestone Center Plaza
    const plazaGeo = new THREE.PlaneGeometry(40, 60);
    const plazaMat = new THREE.MeshLambertMaterial({ 
      color: theme === 'rajasthan' ? 0xE8A598 : (theme === 'delhi' ? 0x994D38 : 0xA5A8AC) 
    });
    const plazaMesh = new THREE.Mesh(plazaGeo, plazaMat);
    plazaMesh.rotation.x = -Math.PI / 2;
    plazaMesh.position.y = 0.02;
    plazaMesh.receiveShadow = true;
    this.scene.add(plazaMesh);

    // Water Body (Riverfronts/Beaches for Varanasi, Mumbai, Gujarat, Chennai)
    if (theme === 'varanasi' || theme === 'gujarat' || theme === 'mumbai' || theme === 'chennai' || theme === 'himalayas') {
      const waterGeo = new THREE.PlaneGeometry(160, 40);
      const waterMat = new THREE.MeshStandardMaterial({ 
        color: 0x1A6B88, 
        roughness: 0.1, 
        metalness: 0.3,
        transparent: true,
        opacity: 0.85
      });
      const waterMesh = new THREE.Mesh(waterGeo, waterMat);
      waterMesh.rotation.x = -Math.PI / 2;
      waterMesh.position.set(0, 0.01, -35);
      this.scene.add(waterMesh);

      // Gentle water bobbing animation
      this.animatedElements.push({
        update: (delta) => {
          waterMesh.position.y = 0.02 + Math.sin(Date.now() * 0.002) * 0.05;
        }
      });
    }
  }

  private buildThemeLandmarks(theme: string) {
    const monumentGroup = new THREE.Group();
    monumentGroup.position.set(0, 0, -18);

    if (theme === 'delhi') {
      // Stylized India Gate / Red Fort Arch Monument
      const stoneMat = new THREE.MeshLambertMaterial({ color: 0xB5533A }); // Red sandstone
      const baseGeo = new THREE.BoxGeometry(16, 12, 5);
      const mainArch = new THREE.Mesh(baseGeo, stoneMat);
      mainArch.position.y = 6;
      mainArch.castShadow = true;
      monumentGroup.add(mainArch);

      // Arch cutout representation (inner pillar columns)
      const innerCutout = new THREE.Mesh(
        new THREE.BoxGeometry(8, 8, 6),
        new THREE.MeshLambertMaterial({ color: 0x221111 })
      );
      innerCutout.position.y = 4;
      monumentGroup.add(innerCutout);

      // Top cornice
      const topGeo = new THREE.BoxGeometry(18, 2, 6);
      const topMesh = new THREE.Mesh(topGeo, stoneMat);
      topMesh.position.y = 13;
      monumentGroup.add(topMesh);

      // Flagpole with Indian Tricolor
      this.addFlagpole(monumentGroup, 0, 14, 0);

    } else if (theme === 'varanasi') {
      // Kashi Ghat Temple Spires (Shikhara) & Stairs
      const templeMat = new THREE.MeshLambertMaterial({ color: 0xCD7F32 });
      [-8, 0, 8].forEach((xOffset, idx) => {
        const height = idx === 1 ? 14 : 10;
        const shikharaGeo = new THREE.ConeGeometry(3, height, 8);
        const shikhara = new THREE.Mesh(shikharaGeo, templeMat);
        shikhara.position.set(xOffset, height / 2, -2);
        shikhara.castShadow = true;
        monumentGroup.add(shikhara);

        const baseGeo = new THREE.BoxGeometry(7, 3, 7);
        const base = new THREE.Mesh(baseGeo, templeMat);
        base.position.set(xOffset, 1.5, -2);
        monumentGroup.add(base);

        // Temple gold finial (Kalash)
        const kalashGeo = new THREE.SphereGeometry(0.6, 8, 8);
        const kalashMat = new THREE.MeshStandardMaterial({ color: 0xD4AF37, metalness: 0.9, roughness: 0.1 });
        const kalash = new THREE.Mesh(kalashGeo, kalashMat);
        kalash.position.set(xOffset, height + 1.5, -2);
        monumentGroup.add(kalash);
      });

      // Ghat stone stairs leading down to water
      const stairMat = new THREE.MeshLambertMaterial({ color: 0x8C7A6B });
      for (let s = 0; s < 5; s++) {
        const stepGeo = new THREE.BoxGeometry(32, 0.4, 2);
        const step = new THREE.Mesh(stepGeo, stairMat);
        step.position.set(0, 1.6 - s * 0.35, -9 - s * 1.8);
        monumentGroup.add(step);
      }

    } else if (theme === 'mumbai') {
      // Gateway of India basalt stone arch
      const basaltMat = new THREE.MeshLambertMaterial({ color: 0xB8976C });
      const leftPillar = new THREE.Mesh(new THREE.CylinderGeometry(1.8, 2.0, 12, 12), basaltMat);
      leftPillar.position.set(-6, 6, 0);
      monumentGroup.add(leftPillar);

      const rightPillar = new THREE.Mesh(new THREE.CylinderGeometry(1.8, 2.0, 12, 12), basaltMat);
      rightPillar.position.set(6, 6, 0);
      monumentGroup.add(rightPillar);

      const topArch = new THREE.Mesh(new THREE.BoxGeometry(16, 3, 4), basaltMat);
      topArch.position.set(0, 11, 0);
      monumentGroup.add(topArch);

      const centralDome = new THREE.Mesh(new THREE.SphereGeometry(2.5, 12, 12), basaltMat);
      centralDome.position.set(0, 13.5, 0);
      monumentGroup.add(centralDome);

      this.addFlagpole(monumentGroup, 0, 16, 0);

    } else if (theme === 'rajasthan') {
      // Hawa Mahal Pink City Facade
      const pinkMat = new THREE.MeshLambertMaterial({ color: 0xD47F74 });
      const facade = new THREE.Mesh(new THREE.BoxGeometry(22, 14, 2), pinkMat);
      facade.position.y = 7;
      monumentGroup.add(facade);

      // Ornate Jharokhas (Windows)
      const windowMat = new THREE.MeshLambertMaterial({ color: 0xFDEED9 });
      for (let row = 0; row < 3; row++) {
        for (let col = -3; col <= 3; col++) {
          const win = new THREE.Mesh(new THREE.BoxGeometry(1.4, 2.0, 0.6), windowMat);
          win.position.set(col * 2.8, 3.5 + row * 3.5, 1.1);
          monumentGroup.add(win);
        }
      }
    } else if (theme === 'hyderabad') {
      // Charminar 4 Minarets
      const stuccoMat = new THREE.MeshLambertMaterial({ color: 0xE2CBAA });
      const minaretGeo = new THREE.CylinderGeometry(1.2, 1.4, 16, 12);
      [-6, 6].forEach((x) => {
        [-3, 3].forEach((z) => {
          const minaret = new THREE.Mesh(minaretGeo, stuccoMat);
          minaret.position.set(x, 8, z);
          monumentGroup.add(minaret);

          const dome = new THREE.Mesh(new THREE.SphereGeometry(1.4, 12, 12), stuccoMat);
          dome.position.set(x, 16.5, z);
          monumentGroup.add(dome);
        });
      });
      const centerRoof = new THREE.Mesh(new THREE.BoxGeometry(14, 2, 8), stuccoMat);
      centerRoof.position.y = 10;
      monumentGroup.add(centerRoof);
    } else {
      // Modern Green Smart City / Capital Tech Campus
      const glassMat = new THREE.MeshStandardMaterial({ color: 0x4A90E2, roughness: 0.1, metalness: 0.6 });
      const whiteMat = new THREE.MeshLambertMaterial({ color: 0xEEEEEE });

      const centerBldg = new THREE.Mesh(new THREE.BoxGeometry(12, 14, 6), whiteMat);
      centerBldg.position.y = 7;
      monumentGroup.add(centerBldg);

      const glassFacade = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 0.4), glassMat);
      glassFacade.position.set(0, 7, 3.1);
      monumentGroup.add(glassFacade);

      this.addFlagpole(monumentGroup, 0, 14.5, 0);
    }

    this.scene.add(monumentGroup);
  }

  private addFlagpole(parent: THREE.Group, x: number, y: number, z: number) {
    const poleMat = new THREE.MeshStandardMaterial({ color: 0xC0C0C0, metalness: 0.8 });
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 5, 8), poleMat);
    pole.position.set(x, y + 2.5, z);
    parent.add(pole);

    // Tricolor Flag
    const flagGeo = new THREE.PlaneGeometry(2.0, 1.2, 4, 2);
    // Create canvas texture with Saffron, White (with Ashoka Chakra), Green
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 80;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#FF9933';
    ctx.fillRect(0, 0, 128, 27);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 27, 128, 26);
    ctx.fillStyle = '#138808';
    ctx.fillRect(0, 53, 128, 27);

    // Ashoka Chakra center circle
    ctx.strokeStyle = '#000080';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(64, 40, 10, 0, Math.PI * 2);
    ctx.stroke();

    const flagTex = new THREE.CanvasTexture(canvas);
    const flagMat = new THREE.MeshBasicMaterial({ map: flagTex, side: THREE.DoubleSide });
    const flagMesh = new THREE.Mesh(flagGeo, flagMat);
    flagMesh.position.set(x + 1.0, y + 4.2, z);
    parent.add(flagMesh);

    // Subtle flag wave animation
    this.animatedElements.push({
      update: (delta) => {
        flagMesh.rotation.y = Math.sin(Date.now() * 0.005) * 0.15;
      }
    });
  }

  private buildRoadsAndDecorations(theme: string) {
    // Trees along walkways
    const treeCoords = [
      [-14, 12], [14, 12],
      [-14, -2], [14, -2],
      [-14, -14], [14, -14],
      [-10, 22], [10, 22]
    ];

    treeCoords.forEach(([tx, tz]) => {
      this.createDecorativeTree(tx, tz, theme === 'himalayas' ? 'pine' : (theme === 'chennai' ? 'palm' : 'banyan'));
    });

    // Street Lamps with warm glow
    const lampCoords = [
      [-8, 16], [8, 16],
      [-8, 4], [8, 4],
      [-8, -8], [8, -8]
    ];

    lampCoords.forEach(([lx, lz]) => {
      this.createStreetLamp(lx, lz);
    });
  }

  private createDecorativeTree(x: number, z: number, type: 'banyan' | 'pine' | 'palm') {
    const treeGroup = new THREE.Group();
    treeGroup.position.set(x, 0, z);

    const trunkMat = new THREE.MeshLambertMaterial({ color: 0x5D4037 });
    const foliageMat = new THREE.MeshLambertMaterial({ color: 0x2E7D32 });

    if (type === 'pine') {
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.35, 2.5), trunkMat);
      trunk.position.y = 1.25;
      treeGroup.add(trunk);

      for (let i = 0; i < 3; i++) {
        const cone = new THREE.Mesh(new THREE.ConeGeometry(2.0 - i * 0.4, 2.2, 8), foliageMat);
        cone.position.y = 2.4 + i * 1.4;
        cone.castShadow = true;
        treeGroup.add(cone);
      }
    } else if (type === 'palm') {
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.28, 4.5, 8), trunkMat);
      trunk.position.y = 2.25;
      trunk.rotation.z = (Math.random() - 0.5) * 0.15;
      treeGroup.add(trunk);

      // Palm fronds
      for (let f = 0; f < 6; f++) {
        const frond = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.1, 0.5), foliageMat);
        frond.position.set(0, 4.5, 0);
        frond.rotation.y = (f * Math.PI) / 3;
        frond.rotation.z = -0.35;
        treeGroup.add(frond);
      }
    } else {
      // Banyan / Broadleaf shaded tree
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.45, 2.8), trunkMat);
      trunk.position.y = 1.4;
      trunk.castShadow = true;
      treeGroup.add(trunk);

      const crown1 = new THREE.Mesh(new THREE.SphereGeometry(2.2, 8, 8), foliageMat);
      crown1.position.y = 3.6;
      crown1.scale.set(1.2, 0.9, 1.2);
      crown1.castShadow = true;
      treeGroup.add(crown1);
    }

    this.scene.add(treeGroup);
  }

  private createStreetLamp(x: number, z: number) {
    const lampGroup = new THREE.Group();
    lampGroup.position.set(x, 0, z);

    const postMat = new THREE.MeshLambertMaterial({ color: 0x333333 });
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 3.8), postMat);
    post.position.y = 1.9;
    lampGroup.add(post);

    const lampHeadMat = new THREE.MeshBasicMaterial({ color: 0xFFF5B8 });
    const lampHead = new THREE.Mesh(new THREE.SphereGeometry(0.35, 8, 8), lampHeadMat);
    lampHead.position.y = 3.9;
    lampGroup.add(lampHead);

    this.scene.add(lampGroup);
  }

  // --- Interactive Mission Spawns ---

  private spawnMissionInteractives(mission: Mission) {
    const objList = mission.objectives;

    objList.forEach((obj) => {
      if (obj.type === 'collect_trash') {
        this.spawnTrashItems(obj.required);
      } else if (obj.type === 'plant_tree') {
        this.spawnSoilPlantingMounds(obj.required);
      } else if (obj.type === 'talk_citizen') {
        this.spawnCitizens(obj.required, false);
      } else if (obj.type === 'guide_citizen') {
        this.spawnCitizens(obj.required, true);
        this.spawnWellnessCampCheckpoint(new THREE.Vector3(0, 0, -6));
      } else if (obj.type === 'activate_solar') {
        this.spawnSolarLampKiosks(obj.required);
      } else if (obj.type === 'complete_quiz') {
        this.spawnQuizKiosk(new THREE.Vector3(0, 0, 0));
      }
    });
  }

  // 1. Spawning Collectible Trash (Plastic bottles, cans, wrappers)
  private spawnTrashItems(count: number) {
    const trashColors = [0x3B82F6, 0xEF4444, 0x10B981, 0xF59E0B];

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + (Math.random() * 0.4);
      const radius = 5 + Math.random() * 9;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;

      const trashGroup = new THREE.Group();
      trashGroup.position.set(x, 0.2, z);

      // Stylized bottle or can
      const mat = new THREE.MeshLambertMaterial({ color: trashColors[i % trashColors.length] });
      const bottle = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 0.45, 8), mat);
      bottle.rotation.z = Math.PI / 2;
      trashGroup.add(bottle);

      // Glowing pickup ring
      const ringGeo = new THREE.RingGeometry(0.4, 0.55, 16);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0xFFB74D, side: THREE.DoubleSide });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = -Math.PI / 2;
      ring.position.y = -0.15;
      trashGroup.add(ring);

      // Sparkle indicator above
      const sparkleGeo = new THREE.OctahedronGeometry(0.15);
      const sparkleMat = new THREE.MeshBasicMaterial({ color: 0xFFEB3B });
      const sparkle = new THREE.Mesh(sparkleGeo, sparkleMat);
      sparkle.position.y = 0.6;
      trashGroup.add(sparkle);

      this.scene.add(trashGroup);

      this.interactiveObjects.push({
        id: `trash_${i}`,
        type: 'trash',
        mesh: trashGroup,
        position: new THREE.Vector3(x, 0, z),
        radius: 1.8,
        completed: false
      });

      // Animate floating sparkle
      this.animatedElements.push({
        update: (delta) => {
          sparkle.rotation.y += delta * 3;
          sparkle.position.y = 0.6 + Math.sin(Date.now() * 0.006 + i) * 0.12;
        }
      });
    }
  }

  // 2. Spawning Soil Mounds for Tree Planting
  private spawnSoilPlantingMounds(count: number) {
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + 0.3;
      const radius = 6 + (i % 2) * 5;
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius;

      const moundGroup = new THREE.Group();
      moundGroup.position.set(x, 0, z);

      // Soil mound
      const soilMat = new THREE.MeshLambertMaterial({ color: 0x4E3629 });
      const mound = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.9, 0.25, 12), soilMat);
      mound.position.y = 0.12;
      moundGroup.add(mound);

      // Glowing Green planting beam indicator
      const beamGeo = new THREE.CylinderGeometry(0.3, 0.3, 1.8, 8);
      const beamMat = new THREE.MeshBasicMaterial({ color: 0x4CAF50, transparent: true, opacity: 0.45 });
      const beam = new THREE.Mesh(beamGeo, beamMat);
      beam.position.y = 1.0;
      moundGroup.add(beam);

      this.scene.add(moundGroup);

      this.interactiveObjects.push({
        id: `soil_${i}`,
        type: 'soil',
        mesh: moundGroup,
        position: new THREE.Vector3(x, 0, z),
        radius: 2.0,
        completed: false
      });
    }
  }

  // 3. Spawning Citizens / Volunteers
  private spawnCitizens(count: number, needsGuide: boolean) {
    const kurtiColors = [0xE91E63, 0x00BCD4, 0x9C27B0, 0xFF9800, 0x3F51B5];

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 - 0.5;
      const radius = 7 + (i % 3) * 3;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;

      const citizenGroup = new THREE.Group();
      citizenGroup.position.set(x, 0, z);

      // Body (Indian attire: Saree / Kurta)
      const attireMat = new THREE.MeshLambertMaterial({ color: kurtiColors[i % kurtiColors.length] });
      const skinMat = new THREE.MeshLambertMaterial({ color: 0xE8BE96 });

      const bodyGeo = new THREE.CylinderGeometry(0.24, 0.36, 1.1, 10);
      const body = new THREE.Mesh(bodyGeo, attireMat);
      body.position.y = 0.75;
      citizenGroup.add(body);

      // Head
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.22, 10, 10), skinMat);
      head.position.y = 1.45;
      citizenGroup.add(head);

      // Hair
      const hairMat = new THREE.MeshLambertMaterial({ color: 0x111111 });
      const hair = new THREE.Mesh(new THREE.SphereGeometry(0.23, 8, 8), hairMat);
      hair.position.set(0, 1.52, -0.05);
      citizenGroup.add(hair);

      // Overhead interaction exclamation / namaste bubble
      const iconCanvas = document.createElement('canvas');
      iconCanvas.width = 64;
      iconCanvas.height = 64;
      const ictx = iconCanvas.getContext('2d')!;
      ictx.fillStyle = needsGuide ? '#EF4444' : '#FF9933';
      ictx.beginPath();
      ictx.arc(32, 32, 28, 0, Math.PI * 2);
      ictx.fill();
      ictx.fillStyle = '#FFFFFF';
      ictx.font = 'bold 36px Arial';
      ictx.textAlign = 'center';
      ictx.textBaseline = 'middle';
      ictx.fillText(needsGuide ? '!' : '🙏', 32, 34);

      const iconTex = new THREE.CanvasTexture(iconCanvas);
      const iconSpriteMat = new THREE.SpriteMaterial({ map: iconTex });
      const sprite = new THREE.Sprite(iconSpriteMat);
      sprite.position.y = 2.1;
      sprite.scale.set(0.7, 0.7, 0.7);
      citizenGroup.add(sprite);

      this.scene.add(citizenGroup);

      this.interactiveObjects.push({
        id: `citizen_${i}`,
        type: 'citizen',
        mesh: citizenGroup,
        position: new THREE.Vector3(x, 0, z),
        radius: 2.2,
        completed: false,
        metadata: {
          needsGuide,
          isFollowing: false,
          reachedCamp: false,
          sprite
        }
      });

      // Subtle citizen idle breathing & bob
      this.animatedElements.push({
        update: (delta) => {
          sprite.position.y = 2.1 + Math.sin(Date.now() * 0.005 + i) * 0.08;
        }
      });
    }
  }

  // 4. Spawning Solar Streetlight Kiosks
  private spawnSolarLampKiosks(count: number) {
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + 0.8;
      const radius = 8 + (i % 2) * 4;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;

      const solarGroup = new THREE.Group();
      solarGroup.position.set(x, 0, z);

      // Post
      const post = new THREE.Mesh(
        new THREE.CylinderGeometry(0.1, 0.12, 3.2),
        new THREE.MeshLambertMaterial({ color: 0x475569 })
      );
      post.position.y = 1.6;
      solarGroup.add(post);

      // Solar Panel atop post (tilted)
      const panel = new THREE.Mesh(
        new THREE.BoxGeometry(1.2, 0.08, 0.8),
        new THREE.MeshStandardMaterial({ color: 0x1E3A8A, metalness: 0.8, roughness: 0.2 })
      );
      panel.position.set(0, 3.25, 0);
      panel.rotation.x = 0.35;
      solarGroup.add(panel);

      // Light Fixture (initially off / dim, glows bright upon activation)
      const lampMat = new THREE.MeshBasicMaterial({ color: 0x64748B });
      const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.3, 8, 8), lampMat);
      lamp.position.set(0, 2.9, 0.3);
      solarGroup.add(lamp);

      // Activation ring
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(0.7, 0.9, 16),
        new THREE.MeshBasicMaterial({ color: 0xF59E0B, side: THREE.DoubleSide })
      );
      ring.rotation.x = -Math.PI / 2;
      ring.position.y = 0.04;
      solarGroup.add(ring);

      this.scene.add(solarGroup);

      this.interactiveObjects.push({
        id: `solar_${i}`,
        type: 'solar',
        mesh: solarGroup,
        position: new THREE.Vector3(x, 0, z),
        radius: 2.2,
        completed: false,
        metadata: { lampMat, activated: false }
      });
    }
  }

  // 5. Spawning Quiz Educational Kiosk
  private spawnQuizKiosk(pos: THREE.Vector3) {
    const kioskGroup = new THREE.Group();
    kioskGroup.position.copy(pos);

    // Modern smart digital kiosk pedestal
    const pedestal = new THREE.Mesh(
      new THREE.BoxGeometry(1.4, 1.8, 0.8),
      new THREE.MeshLambertMaterial({ color: 0x1E293B })
    );
    pedestal.position.y = 0.9;
    kioskGroup.add(pedestal);

    // Glowing Screen with Quiz logo
    const screen = new THREE.Mesh(
      new THREE.BoxGeometry(1.2, 1.0, 0.1),
      new THREE.MeshBasicMaterial({ color: 0x38BDF8 })
    );
    screen.position.set(0, 1.2, 0.42);
    kioskGroup.add(screen);

    // Overhead spinning Quiz Hologram / Book
    const iconGeo = new THREE.BoxGeometry(0.6, 0.5, 0.1);
    const iconMat = new THREE.MeshBasicMaterial({ color: 0xFACC15 });
    const icon = new THREE.Mesh(iconGeo, iconMat);
    icon.position.set(0, 2.4, 0);
    kioskGroup.add(icon);

    this.scene.add(kioskGroup);

    this.interactiveObjects.push({
      id: `quiz_kiosk`,
      type: 'quiz_kiosk',
      mesh: kioskGroup,
      position: pos,
      radius: 2.5,
      completed: false
    });

    this.animatedElements.push({
      update: (delta) => {
        icon.rotation.y += delta * 2;
        icon.position.y = 2.4 + Math.sin(Date.now() * 0.005) * 0.1;
      }
    });
  }

  // 6. Wellness Camp Checkpoint for Guiding Citizens
  private spawnWellnessCampCheckpoint(pos: THREE.Vector3) {
    const campGroup = new THREE.Group();
    campGroup.position.copy(pos);

    // White & Green Ayushman tent / canopy
    const canopyMat = new THREE.MeshLambertMaterial({ color: 0x10B981 });
    const canopy = new THREE.Mesh(new THREE.ConeGeometry(3.5, 2.0, 6), canopyMat);
    canopy.position.y = 2.8;
    campGroup.add(canopy);

    // 4 poles
    const poleMat = new THREE.MeshLambertMaterial({ color: 0xE2E8F0 });
    [-1.8, 1.8].forEach((px) => {
      [-1.8, 1.8].forEach((pz) => {
        const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 2.5), poleMat);
        pole.position.set(px, 1.25, pz);
        campGroup.add(pole);
      });
    });

    // Medical Red Cross symbol atop
    const crossH = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.24, 0.1), new THREE.MeshBasicMaterial({ color: 0xEF4444 }));
    crossH.position.set(0, 4.0, 0);
    campGroup.add(crossH);
    const crossV = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.8, 0.1), new THREE.MeshBasicMaterial({ color: 0xEF4444 }));
    crossV.position.set(0, 4.0, 0);
    campGroup.add(crossV);

    // Target Ground Beam
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(2.0, 2.5, 24),
      new THREE.MeshBasicMaterial({ color: 0x10B981, side: THREE.DoubleSide })
    );
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.05;
    campGroup.add(ring);

    this.scene.add(campGroup);

    this.interactiveObjects.push({
      id: `wellness_camp`,
      type: 'checkpoint',
      mesh: campGroup,
      position: pos,
      radius: 3.5,
      completed: false
    });
  }

  public update(delta: number) {
    for (const elem of this.animatedElements) {
      elem.update(delta);
    }
  }
}
