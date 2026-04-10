(function () {
  const params = new URLSearchParams(window.location.search);
  const locale = params.get("lang") === "en" ? "en" : "zh";
  const state = {
    lang: locale,
    mode: params.get("mode") || "studio",
    material: params.get("material") || "plaster",
    accent: params.get("accent") || "#f59e0b",
    bg: params.get("bg") || "#14110f",
    model: params.get("model") || "",
    autorotate: params.get("autorotate") !== "false",
  };
  const copyByLocale = {
    zh: {
      documentTitle: "PaintersGO Lite 预览器",
      brandTitle: "PaintersGO Lite 预览器",
      brandSubtitle: "来自 App WebView 内核的浏览器预览器",
      infoEyebrow: "Live Editor Lite",
      infoTitle: "先在网页试看模型，再决定是否进入完整 App",
      defaultDescription:
        "当前是浏览器可运行的 Lite Viewer，场景和材质思路来自 PaintersGO App 的 Three.js WebView 内核。",
      materialLabel: "材质",
      modelLabel: "模型",
      proceduralPlaceholder: "程序化占位模型（可替换为导出的 GLB）",
      proceduralDescription:
        "当前没有接入真实导出模型，所以先显示一个可交互的占位 3D 角色。接入 PaintersGO 导出的 GLB 后，这个 viewer 会直接展示真实模型。",
      loadedDescription:
        "这个 Lite Viewer 已支持通过 URL 加载外部 GLB/GLTF/STL 模型，方便先在官网做公开试看。",
      loadedStlPrefix: "已加载 STL：",
      loadedGltfPrefix: "已加载 GLTF：",
      failedPrefix: "模型加载失败：",
      modeLabels: {
        studio: "工作室",
        clay: "粘土",
        wireframe: "线框",
      },
      materialLabels: {
        plaster: "石膏",
        clay: "陶土",
        plastic: "塑料",
        ceramic: "陶瓷",
        metal: "金属",
      },
    },
    en: {
      documentTitle: "PaintersGO Lite Viewer",
      brandTitle: "PaintersGO Lite Viewer",
      brandSubtitle: "Browser preview extracted from the app WebView core",
      infoEyebrow: "Live Editor Lite",
      infoTitle: "Preview models on web before opening the full app",
      defaultDescription:
        "This browser Lite Viewer reuses scene and material ideas from the PaintersGO app's Three.js WebView core.",
      materialLabel: "Material",
      modelLabel: "Model",
      proceduralPlaceholder: "Procedural placeholder (replace with exported GLB later)",
      proceduralDescription:
        "No exported production model is connected yet, so a procedural interactive placeholder is shown first. Once a PaintersGO GLB is connected, this viewer renders the real model.",
      loadedDescription:
        "This Lite Viewer supports loading external GLB/GLTF/STL models by URL for public preview on the website.",
      loadedStlPrefix: "Loaded STL from ",
      loadedGltfPrefix: "Loaded GLTF from ",
      failedPrefix: "Failed to load model from ",
      modeLabels: {
        studio: "Studio",
        clay: "Clay",
        wireframe: "Wireframe",
      },
      materialLabels: {
        plaster: "Plaster",
        clay: "Clay",
        plastic: "Plastic",
        ceramic: "Ceramic",
        metal: "Metal",
      },
    },
  };
  const t = copyByLocale[locale];
  const isLikelyMobile = window.matchMedia("(max-width: 767px), (pointer: coarse)").matches;

  const canvas = document.getElementById("viewer-canvas");
  const controlsRoot = document.getElementById("controls");
  const materialStatus = document.getElementById("material-status");
  const modelStatus = document.getElementById("model-status");
  const viewerDescription = document.getElementById("viewer-description");
  const brandTitle = document.getElementById("brand-title");
  const brandSubtitle = document.getElementById("brand-subtitle");
  const infoEyebrow = document.getElementById("info-eyebrow");
  const infoTitle = document.getElementById("info-title");
  const materialLabel = document.getElementById("material-label");
  const modelLabel = document.getElementById("model-label");

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(state.bg);
  scene.fog = new THREE.Fog(state.bg, 4.2, 10.5);

  const camera = new THREE.PerspectiveCamera(
    40,
    window.innerWidth / window.innerHeight,
    0.01,
    100
  );
  camera.position.set(0, 0.75, 4.6);

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: false,
    preserveDrawingBuffer: false,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isLikelyMobile ? 1 : 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  if (THREE.SRGBColorSpace) renderer.outputColorSpace = THREE.SRGBColorSpace;
  else if (THREE.sRGBEncoding) renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const hemi = new THREE.HemisphereLight(0xffffff, 0x3f3126, 0.48);
  scene.add(hemi);

  const keyLight = new THREE.DirectionalLight(0xfff2d8, 1.9);
  keyLight.position.set(5, 6, 4);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0xe1efff, 0.6);
  fillLight.position.set(-4, 3, -3);
  scene.add(fillLight);

  const rimLight = new THREE.PointLight(0xfb923c, 9, 18);
  rimLight.position.set(-3, 1, 2);
  scene.add(rimLight);

  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enablePan = true;
  controls.enableZoom = true;
  controls.enableDamping = !isLikelyMobile;
  controls.dampingFactor = 0.06;
  controls.minDistance = 1.1;
  controls.maxDistance = 11.5;
  controls.minAzimuthAngle = -Infinity;
  controls.maxAzimuthAngle = Infinity;
  controls.minPolarAngle = 0.06;
  controls.maxPolarAngle = Math.PI - 0.06;
  controls.rotateSpeed = 0.9;
  controls.zoomSpeed = 1.05;
  controls.panSpeed = 0.85;

  const stageGroup = new THREE.Group();
  scene.add(stageGroup);

  const floor = new THREE.Mesh(
    new THREE.CircleGeometry(4, 64),
    new THREE.MeshBasicMaterial({
      color: 0x21170f,
      transparent: true,
      opacity: 0.9,
    })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -1.7;
  scene.add(floor);

  const halo = new THREE.Mesh(
    new THREE.TorusGeometry(1.9, 0.04, 18, 120),
    new THREE.MeshStandardMaterial({
      color: new THREE.Color(state.accent),
      emissive: new THREE.Color(state.accent),
      emissiveIntensity: 0.45,
      metalness: 0.25,
      roughness: 0.2,
    })
  );
  halo.rotation.x = Math.PI / 2;
  halo.position.set(0, -1.48, -0.2);
  scene.add(halo);

  let modelRoot = null;
  const proceduralMeshes = [];

  function updateUrl() {
    const next = new URLSearchParams();
    next.set("lang", state.lang);
    next.set("mode", state.mode);
    next.set("material", state.material);
    next.set("accent", state.accent);
    next.set("bg", state.bg);
    if (state.model) next.set("model", state.model);
    if (!state.autorotate) next.set("autorotate", "false");
    history.replaceState({}, "", `${window.location.pathname}?${next.toString()}`);
  }

  function setStatus() {
    const modeLabel = t.modeLabels[state.mode] || state.mode;
    const materialValue = t.materialLabels[state.material] || state.material;
    materialStatus.textContent = `${modeLabel} / ${materialValue}`;
  }

  function clearModel() {
    if (!modelRoot) return;
    stageGroup.remove(modelRoot);
    modelRoot.traverse(function (node) {
      if (!node.isMesh) return;
      if (node.geometry) node.geometry.dispose();
      if (node.material) {
        if (Array.isArray(node.material)) node.material.forEach((item) => item.dispose());
        else node.material.dispose();
      }
    });
    modelRoot = null;
    proceduralMeshes.length = 0;
  }

  function buildMaterial() {
    const accent = new THREE.Color(state.accent);
    const presets = {
      plaster: { roughness: 0.62, metalness: 0.02, color: accent.clone().lerp(new THREE.Color("#f6efe5"), 0.7) },
      clay: { roughness: 0.94, metalness: 0.0, color: accent.clone().lerp(new THREE.Color("#c68a45"), 0.5) },
      plastic: { roughness: 0.28, metalness: 0.0, color: accent.clone().lerp(new THREE.Color("#ffffff"), 0.22) },
      metal: { roughness: 0.16, metalness: 1.0, color: accent.clone().lerp(new THREE.Color("#d8dee8"), 0.45) },
      ceramic: { roughness: 0.07, metalness: 0.0, color: accent.clone().lerp(new THREE.Color("#fffaf0"), 0.68) },
    };

    const preset = presets[state.material] || presets.plaster;
    if (state.mode === "wireframe") {
      return new THREE.MeshStandardMaterial({
        color: preset.color,
        wireframe: true,
        roughness: 0.45,
        metalness: 0.2,
      });
    }

    if (state.mode === "clay") {
      return new THREE.MeshStandardMaterial({
        color: new THREE.Color("#e9dfd0"),
        roughness: 0.95,
        metalness: 0.02,
      });
    }

    return new THREE.MeshPhysicalMaterial({
      color: preset.color,
      roughness: preset.roughness,
      metalness: preset.metalness,
      clearcoat: state.material === "ceramic" ? 1 : 0.35,
      clearcoatRoughness: state.material === "ceramic" ? 0.08 : 0.22,
    });
  }

  function applyMaterial(material) {
    if (!modelRoot) return;
    modelRoot.traverse(function (node) {
      if (!node.isMesh) return;
      if (Array.isArray(node.material)) node.material.forEach((item) => item.dispose());
      else if (node.material) node.material.dispose();
      node.material = material.clone();
    });
    halo.material.color.set(state.accent);
    halo.material.emissive.set(state.accent);
    setStatus();
  }

  function buildProceduralModel() {
    const root = new THREE.Group();
    const material = buildMaterial();

    const head = new THREE.Mesh(new THREE.IcosahedronGeometry(0.72, 2), material.clone());
    head.position.set(0, 0.82, 0);
    root.add(head);
    proceduralMeshes.push(head);

    const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.58, 1.38, 8, 18), material.clone());
    torso.position.set(0, -0.08, 0);
    root.add(torso);
    proceduralMeshes.push(torso);

    const armL = new THREE.Mesh(new THREE.CapsuleGeometry(0.18, 1.1, 6, 14), material.clone());
    armL.position.set(-0.95, 0.06, 0);
    armL.rotation.set(0.42, 0.2, 1.08);
    root.add(armL);
    proceduralMeshes.push(armL);

    const armR = new THREE.Mesh(new THREE.CapsuleGeometry(0.18, 1.1, 6, 14), material.clone());
    armR.position.set(0.95, 0.06, 0);
    armR.rotation.set(-0.42, -0.2, -1.08);
    root.add(armR);
    proceduralMeshes.push(armR);

    const legL = new THREE.Mesh(new THREE.CapsuleGeometry(0.2, 1.16, 6, 14), material.clone());
    legL.position.set(-0.34, -1.34, 0);
    legL.rotation.set(0.14, 0.08, 0.06);
    root.add(legL);
    proceduralMeshes.push(legL);

    const legR = new THREE.Mesh(new THREE.CapsuleGeometry(0.2, 1.16, 6, 14), material.clone());
    legR.position.set(0.34, -1.34, 0);
    legR.rotation.set(-0.14, -0.08, -0.06);
    root.add(legR);
    proceduralMeshes.push(legR);

    const plate = new THREE.Mesh(
      new THREE.BoxGeometry(0.98, 0.42, 0.18),
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#151515"),
        roughness: 0.22,
        metalness: 0.75,
      })
    );
    plate.position.set(0.24, 0.64, 0.56);
    plate.rotation.set(0.34, 0.45, -0.18);
    root.add(plate);
    proceduralMeshes.push(plate);

    root.position.y = -0.12;
    return root;
  }

  function fitModel(object) {
    const box = new THREE.Box3().setFromObject(object);
    const size = box.getSize(new THREE.Vector3()).length() || 1;
    const center = box.getCenter(new THREE.Vector3());
    const scale = 2.5 / size;
    object.scale.setScalar(scale);
    object.position.sub(center.multiplyScalar(scale));
    object.position.y -= 0.16;
    controls.target.set(0, 0.12, 0);
    camera.position.set(0, 0.8, 4.6);
    controls.update();
  }

  function setDescription(text) {
    viewerDescription.textContent = text;
  }

  function showProceduralFallback() {
    clearModel();
    modelRoot = buildProceduralModel();
    stageGroup.add(modelRoot);
    fitModel(modelRoot);
    modelStatus.textContent = t.proceduralPlaceholder;
    setDescription(t.proceduralDescription);


    setStatus();
  }

  function loadModel(url) {
    if (!url) {
      showProceduralFallback();
      return;
    }

    clearModel();
    const lower = url.toLowerCase();
    const onLoaded = function (loaded) {
      modelRoot = loaded;
      stageGroup.add(modelRoot);
      fitModel(modelRoot);
      applyMaterial(buildMaterial());
      modelStatus.textContent = lower.endsWith(".stl")
        ? `${t.loadedStlPrefix}${url}`
        : `${t.loadedGltfPrefix}${url}`;
      setDescription(t.loadedDescription);


    };

    const onError = function () {
      modelStatus.textContent = `${t.failedPrefix}${url}`;
      showProceduralFallback();
    };

    if (lower.endsWith(".stl")) {
      const loader = new THREE.STLLoader();
      loader.load(
        url,
        function (geometry) {
          geometry.center();
          const material = buildMaterial();
          const mesh = new THREE.Mesh(geometry, material);
          onLoaded(new THREE.Group().add(mesh));
        },
        undefined,
        onError
      );
      return;
    }

    const loader = new THREE.GLTFLoader();
    loader.load(
      url,
      function (gltf) {
        onLoaded(gltf.scene);
      },
      undefined,
      onError
    );
  }

  function renderButtons() {
    const buttonGroups = [
      {
        key: "mode",
        values: ["studio", "clay", "wireframe"],
        onClick(value) {
          state.mode = value;
          applyMaterial(buildMaterial());
          updateUrl();
          renderButtons();
        },
      },
      {
        key: "material",
        values: ["plaster", "clay", "plastic", "ceramic", "metal"],
        onClick(value) {
          state.material = value;
          applyMaterial(buildMaterial());
          updateUrl();
          renderButtons();
        },
      },
    ];

    controlsRoot.innerHTML = "";

    buttonGroups.forEach(function (group) {
      group.values.forEach(function (value) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = `chip${state[group.key] === value ? " is-active" : ""}`;
        const labelMap = group.key === "mode" ? t.modeLabels : t.materialLabels;
        button.textContent = labelMap[value] || value;
        button.addEventListener("click", function () {
          group.onClick(value);
        });
        controlsRoot.appendChild(button);
      });
    });
  }

  let lastFrameTime = 0;
  const mobileFrameInterval = 1000 / 30;

  function animate(now) {
    requestAnimationFrame(animate);
    if (isLikelyMobile && now - lastFrameTime < mobileFrameInterval) {
      return;
    }
    lastFrameTime = now;

    if (state.autorotate && modelRoot) {
      modelRoot.rotation.y += isLikelyMobile ? 0.0022 : 0.0035;
      halo.rotation.z += isLikelyMobile ? 0.0018 : 0.003;
    }
    controls.update();
    renderer.render(scene, camera);
  }

  window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  document.documentElement.lang = locale === "en" ? "en" : "zh-CN";
  document.title = t.documentTitle;
  if (brandTitle) brandTitle.textContent = t.brandTitle;
  if (brandSubtitle) brandSubtitle.textContent = t.brandSubtitle;
  if (infoEyebrow) infoEyebrow.textContent = t.infoEyebrow;
  if (infoTitle) infoTitle.textContent = t.infoTitle;
  if (viewerDescription) viewerDescription.textContent = t.defaultDescription;
  if (materialLabel) materialLabel.textContent = t.materialLabel;
  if (modelLabel) modelLabel.textContent = t.modelLabel;

  document.documentElement.style.setProperty("--accent", state.accent);
  renderButtons();
  loadModel(state.model);
  animate();
})();
