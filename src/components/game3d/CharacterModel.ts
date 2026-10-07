import * as THREE from 'three';

export interface CharacterAnimationState {
  isMoving: boolean;
  isRunning: boolean;
  isJumping: boolean;
  isPerformingNamaste: boolean;
  isSweeping: boolean;
  isPlanting: boolean;
  speed: number;
}

export class CharacterModel {
  public group: THREE.Group;
  
  // Limbs and parts for procedural animation
  private headGroup: THREE.Group;
  private torsoMesh: THREE.Mesh;
  private vestMesh: THREE.Mesh;
  private leftArmGroup: THREE.Group;
  private rightArmGroup: THREE.Group;
  private leftLegGroup: THREE.Group;
  private rightLegGroup: THREE.Group;
  private broomMesh: THREE.Group;
  private saplingProp: THREE.Group;
  
  private animTimer = 0;

  constructor(vestHex: string = '#FF9933', kurtaHex: string = '#FFFFFF') {
    this.group = new THREE.Group();

    // Materials
    const skinMat = new THREE.MeshLambertMaterial({ color: 0xF3C69D }); // Respectful warm Indian skin tone
    const hairMat = new THREE.MeshLambertMaterial({ color: 0xE8ECF0 }); // Silver-white hair & beard
    const kurtaMat = new THREE.MeshLambertMaterial({ color: kurtaHex });
    const vestMat = new THREE.MeshLambertMaterial({ color: vestHex });
    const shoeMat = new THREE.MeshLambertMaterial({ color: 0x1A1A1A });
    const spectacleMat = new THREE.MeshLambertMaterial({ color: 0x333333 });
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xD4AF37, metalness: 0.8, roughness: 0.2 });

    // --- Root Offset (Character Height ~ 1.75m) ---
    const characterRoot = new THREE.Group();
    characterRoot.position.y = 0.85;
    this.group.add(characterRoot);

    // --- 1. Torso (Kurta) ---
    const torsoGeo = new THREE.BoxGeometry(0.48, 0.62, 0.32);
    this.torsoMesh = new THREE.Mesh(torsoGeo, kurtaMat);
    this.torsoMesh.position.y = 0.28;
    this.torsoMesh.castShadow = true;
    this.torsoMesh.receiveShadow = true;
    characterRoot.add(this.torsoMesh);

    // --- 2. Vest / Nehru Jacket (Modi Jacket) ---
    const vestGeo = new THREE.BoxGeometry(0.50, 0.58, 0.34);
    this.vestMesh = new THREE.Mesh(vestGeo, vestMat);
    this.vestMesh.position.y = 0.30;
    this.vestMesh.castShadow = true;
    characterRoot.add(this.vestMesh);

    // Collar detail
    const collarGeo = new THREE.CylinderGeometry(0.12, 0.14, 0.08, 16);
    const collar = new THREE.Mesh(collarGeo, vestMat);
    collar.position.set(0, 0.60, 0);
    characterRoot.add(collar);

    // Small pocket & decorative pen/flower on vest
    const pocketGeo = new THREE.BoxGeometry(0.10, 0.08, 0.02);
    const pocketMat = new THREE.MeshLambertMaterial({ color: 0x222222 });
    const pocket = new THREE.Mesh(pocketGeo, pocketMat);
    pocket.position.set(0.14, 0.42, 0.175);
    characterRoot.add(pocket);

    // --- 3. Head & Distinctive Stylized Features ---
    this.headGroup = new THREE.Group();
    this.headGroup.position.set(0, 0.76, 0);
    characterRoot.add(this.headGroup);

    // Head base
    const headGeo = new THREE.BoxGeometry(0.32, 0.34, 0.30);
    const headMesh = new THREE.Mesh(headGeo, skinMat);
    headMesh.castShadow = true;
    this.headGroup.add(headMesh);

    // Silver Hair (Top & Sides)
    const hairGeo = new THREE.BoxGeometry(0.34, 0.12, 0.32);
    const hairTop = new THREE.Mesh(hairGeo, hairMat);
    hairTop.position.set(0, 0.16, 0);
    hairTop.castShadow = true;
    this.headGroup.add(hairTop);

    const hairBackGeo = new THREE.BoxGeometry(0.34, 0.22, 0.08);
    const hairBack = new THREE.Mesh(hairBackGeo, hairMat);
    hairBack.position.set(0, 0.02, -0.13);
    this.headGroup.add(hairBack);

    // Distinguished silver beard and mustache (neatly groomed)
    const beardGeo = new THREE.BoxGeometry(0.30, 0.14, 0.10);
    const beardMesh = new THREE.Mesh(beardGeo, hairMat);
    beardMesh.position.set(0, -0.12, 0.12);
    this.headGroup.add(beardMesh);

    const mustacheGeo = new THREE.BoxGeometry(0.24, 0.05, 0.08);
    const mustacheMesh = new THREE.Mesh(mustacheGeo, hairMat);
    mustacheMesh.position.set(0, -0.02, 0.14);
    this.headGroup.add(mustacheMesh);

    // Wireframe Spectacles / Glasses
    const frameGeo = new THREE.TorusGeometry(0.045, 0.009, 8, 16);
    const leftFrame = new THREE.Mesh(frameGeo, spectacleMat);
    leftFrame.position.set(-0.075, 0.05, 0.155);
    this.headGroup.add(leftFrame);

    const rightFrame = new THREE.Mesh(frameGeo, spectacleMat);
    rightFrame.position.set(0.075, 0.05, 0.155);
    this.headGroup.add(rightFrame);

    // Bridge between glasses
    const bridgeGeo = new THREE.CylinderGeometry(0.006, 0.006, 0.05);
    const bridge = new THREE.Mesh(bridgeGeo, spectacleMat);
    bridge.rotation.z = Math.PI / 2;
    bridge.position.set(0, 0.05, 0.155);
    this.headGroup.add(bridge);

    // --- 4. Arms & Hands ---
    const armGeo = new THREE.BoxGeometry(0.12, 0.44, 0.12);
    const handGeo = new THREE.BoxGeometry(0.10, 0.12, 0.10);

    // Left Arm
    this.leftArmGroup = new THREE.Group();
    this.leftArmGroup.position.set(-0.30, 0.52, 0);
    const leftArmMesh = new THREE.Mesh(armGeo, kurtaMat);
    leftArmMesh.position.y = -0.18;
    leftArmMesh.castShadow = true;
    this.leftArmGroup.add(leftArmMesh);

    const leftHand = new THREE.Mesh(handGeo, skinMat);
    leftHand.position.y = -0.42;
    this.leftArmGroup.add(leftHand);
    characterRoot.add(this.leftArmGroup);

    // Right Arm
    this.rightArmGroup = new THREE.Group();
    this.rightArmGroup.position.set(0.30, 0.52, 0);
    const rightArmMesh = new THREE.Mesh(armGeo, kurtaMat);
    rightArmMesh.position.y = -0.18;
    rightArmMesh.castShadow = true;
    this.rightArmGroup.add(rightArmMesh);

    const rightHand = new THREE.Mesh(handGeo, skinMat);
    rightHand.position.y = -0.42;
    this.rightArmGroup.add(rightHand);
    characterRoot.add(this.rightArmGroup);

    // --- 5. Legs & Traditional Shoes ---
    const legGeo = new THREE.BoxGeometry(0.16, 0.54, 0.16);
    const shoeGeo = new THREE.BoxGeometry(0.17, 0.12, 0.24);

    // Left Leg
    this.leftLegGroup = new THREE.Group();
    this.leftLegGroup.position.set(-0.13, 0.0, 0);
    const leftLegMesh = new THREE.Mesh(legGeo, kurtaMat);
    leftLegMesh.position.y = -0.27;
    leftLegMesh.castShadow = true;
    this.leftLegGroup.add(leftLegMesh);

    const leftShoe = new THREE.Mesh(shoeGeo, shoeMat);
    leftShoe.position.set(0, -0.56, 0.04);
    leftShoe.castShadow = true;
    this.leftLegGroup.add(leftShoe);
    characterRoot.add(this.leftLegGroup);

    // Right Leg
    this.rightLegGroup = new THREE.Group();
    this.rightLegGroup.position.set(0.13, 0.0, 0);
    const rightLegMesh = new THREE.Mesh(legGeo, kurtaMat);
    rightLegMesh.position.y = -0.27;
    rightLegMesh.castShadow = true;
    this.rightLegGroup.add(rightLegMesh);

    const rightShoe = new THREE.Mesh(shoeGeo, shoeMat);
    rightShoe.position.set(0, -0.56, 0.04);
    rightShoe.castShadow = true;
    this.rightLegGroup.add(rightShoe);
    characterRoot.add(this.rightLegGroup);

    // --- 6. Props: Traditional Broom (Swachh Bharat) ---
    this.broomMesh = new THREE.Group();
    const handleGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.9);
    const handleMat = new THREE.MeshLambertMaterial({ color: 0x8B5A2B });
    const handle = new THREE.Mesh(handleGeo, handleMat);
    this.broomMesh.add(handle);

    const bristlesGeo = new THREE.ConeGeometry(0.12, 0.35, 8);
    const bristlesMat = new THREE.MeshLambertMaterial({ color: 0xC2B280 });
    const bristles = new THREE.Mesh(bristlesGeo, bristlesMat);
    bristles.position.y = -0.45;
    this.broomMesh.add(bristles);
    this.broomMesh.position.set(0.1, -0.2, 0.2);
    this.broomMesh.rotation.x = Math.PI / 4;
    this.broomMesh.visible = false;
    this.rightArmGroup.add(this.broomMesh);

    // --- 7. Props: Green Sapling (Plantation) ---
    this.saplingProp = new THREE.Group();
    const stemGeo = new THREE.CylinderGeometry(0.015, 0.02, 0.4);
    const stemMat = new THREE.MeshLambertMaterial({ color: 0x5C4033 });
    const stem = new THREE.Mesh(stemGeo, stemMat);
    this.saplingProp.add(stem);

    const leafGeo = new THREE.SphereGeometry(0.12, 6, 6);
    const leafMat = new THREE.MeshLambertMaterial({ color: 0x228B22 });
    const leaves = new THREE.Mesh(leafGeo, leafMat);
    leaves.position.y = 0.2;
    leaves.scale.set(1.3, 0.8, 1);
    this.saplingProp.add(leaves);
    this.saplingProp.position.set(-0.1, -0.3, 0.2);
    this.saplingProp.visible = false;
    this.leftArmGroup.add(this.saplingProp);
  }

  public updateOutfitColors(vestHex: string, kurtaHex: string = '#FFFFFF') {
    (this.vestMesh.material as THREE.MeshLambertMaterial).color.set(vestHex);
    (this.torsoMesh.material as THREE.MeshLambertMaterial).color.set(kurtaHex);
  }

  public animate(delta: number, state: CharacterAnimationState) {
    this.animTimer += delta;

    // Show/hide props based on action
    this.broomMesh.visible = state.isSweeping;
    this.saplingProp.visible = state.isPlanting;

    // 1. Namaste Pose
    if (state.isPerformingNamaste) {
      // Bring hands to chest, palms touching
      this.leftArmGroup.rotation.x = THREE.MathUtils.lerp(this.leftArmGroup.rotation.x, -1.2, 0.2);
      this.leftArmGroup.rotation.y = THREE.MathUtils.lerp(this.leftArmGroup.rotation.y, 0.6, 0.2);
      this.leftArmGroup.rotation.z = THREE.MathUtils.lerp(this.leftArmGroup.rotation.z, 0.4, 0.2);

      this.rightArmGroup.rotation.x = THREE.MathUtils.lerp(this.rightArmGroup.rotation.x, -1.2, 0.2);
      this.rightArmGroup.rotation.y = THREE.MathUtils.lerp(this.rightArmGroup.rotation.y, -0.6, 0.2);
      this.rightArmGroup.rotation.z = THREE.MathUtils.lerp(this.rightArmGroup.rotation.z, -0.4, 0.2);

      this.leftLegGroup.rotation.x = THREE.MathUtils.lerp(this.leftLegGroup.rotation.x, 0, 0.2);
      this.rightLegGroup.rotation.x = THREE.MathUtils.lerp(this.rightLegGroup.rotation.x, 0, 0.2);

      // Slight respectful head bow
      this.headGroup.rotation.x = THREE.MathUtils.lerp(this.headGroup.rotation.x, 0.25, 0.2);
      return;
    } else {
      this.headGroup.rotation.x = THREE.MathUtils.lerp(this.headGroup.rotation.x, 0, 0.1);
    }

    // 2. Sweeping Animation
    if (state.isSweeping) {
      const sweepCycle = Math.sin(this.animTimer * 12);
      this.rightArmGroup.rotation.x = -0.7 + sweepCycle * 0.4;
      this.rightArmGroup.rotation.y = -0.3 + sweepCycle * 0.3;
      this.leftArmGroup.rotation.x = -0.4 + sweepCycle * 0.2;
      return;
    }

    // 3. Planting Animation
    if (state.isPlanting) {
      const plantCycle = Math.sin(this.animTimer * 8);
      this.rightArmGroup.rotation.x = -1.1 + plantCycle * 0.2;
      this.leftArmGroup.rotation.x = -1.1 + plantCycle * 0.2;
      return;
    }

    // 4. Moving (Walking or Running)
    if (state.isMoving) {
      const freq = state.isRunning ? 14 : 9;
      const legAmp = state.isRunning ? 0.85 : 0.55;
      const armAmp = state.isRunning ? 0.75 : 0.45;

      const legAngle = Math.sin(this.animTimer * freq) * legAmp;

      this.leftLegGroup.rotation.x = legAngle;
      this.rightLegGroup.rotation.x = -legAngle;

      this.leftArmGroup.rotation.x = -legAngle * armAmp;
      this.rightArmGroup.rotation.x = legAngle * armAmp;
      this.leftArmGroup.rotation.z = 0.05;
      this.rightArmGroup.rotation.z = -0.05;
      this.leftArmGroup.rotation.y = 0;
      this.rightArmGroup.rotation.y = 0;

      // Gentle vertical bobbing
      this.group.position.y = Math.abs(Math.sin(this.animTimer * freq)) * 0.05;
    } else {
      // 5. Idle breathing
      const breath = Math.sin(this.animTimer * 2.5) * 0.03;
      this.leftLegGroup.rotation.x = THREE.MathUtils.lerp(this.leftLegGroup.rotation.x, 0, 0.15);
      this.rightLegGroup.rotation.x = THREE.MathUtils.lerp(this.rightLegGroup.rotation.x, 0, 0.15);

      this.leftArmGroup.rotation.x = THREE.MathUtils.lerp(this.leftArmGroup.rotation.x, breath, 0.1);
      this.rightArmGroup.rotation.x = THREE.MathUtils.lerp(this.rightArmGroup.rotation.x, -breath, 0.1);
      this.leftArmGroup.rotation.z = 0.08;
      this.rightArmGroup.rotation.z = -0.08;
      this.leftArmGroup.rotation.y = 0;
      this.rightArmGroup.rotation.y = 0;

      this.group.position.y = 0;
    }
  }
}
