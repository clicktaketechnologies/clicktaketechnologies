import type { DeepDiveContent } from "@/components/site/deep-dive/deep-dive-types"

/**
 * /services/ai/cv-nlp — Computer Vision & NLP
 *
 * Vision pipelines (detection, OCR, classification, segmentation) and
 * NLP pipelines (NER, sentiment, summarization, translation) from dataset
 * curation to edge deployment. ~3,200 words, 12 sections.
 */
export const aiCvNlpDeepDive: DeepDiveContent = {
  hero: {
    eyebrow: "AI & Automation",
    title: "Computer Vision & NLP: From Dataset Curation to Edge Deployment",
    subtitle:
      "We design, train, evaluate and deploy vision pipelines (YOLO, ResNet, ViT, SAM, PaddleOCR) and NLP pipelines (NER, sentiment, summarization, translation, embeddings) — from raw data through annotated datasets, trained models, eval suites and edge deployment on ONNX, TensorRT, CoreML and TFLite.",
    geoDefinition:
      "Computer vision is the subfield of machine learning concerned with deriving structured information from images and video, encompassing object detection (YOLO, DETR), image classification (ResNet, ViT), semantic and instance segmentation (SAM, Mask R-CNN), and optical character recognition (Tesseract, PaddleOCR). Natural language processing (NLP) is the parallel subfield for text, covering named-entity recognition, sentiment analysis, summarization, translation and embedding-based retrieval. ClickTake Technologies delivers computer vision and NLP systems to clients across Birmingham (UK), Multan (Pakistan), Austin (USA) and Dubai (UAE), with engineering teams fluent in PyTorch, ONNX, TensorRT, OpenCV and Hugging Face Transformers, deploying to cloud GPUs, on-premises servers and mobile/edge devices.",
    character: "service-detail",
    ctas: [
      { label: "Book a Free CV/NLP Strategy Call", href: "/contact", variant: "orange" },
      { label: "Download the Vision Pipeline Brief", href: "/resources", variant: "outline" },
    ],
    stats: [
      { value: "41", label: "CV/NLP pipelines shipped" },
      { value: "0.89", label: "Avg. mAP@0.5" },
      { value: "<45ms", label: "Edge inference latency" },
      { value: "12+", label: "Edge device targets" },
    ],
    crumbs: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "AI & Automation", href: "/services/ai/cv-nlp" },
      { label: "Computer Vision & NLP" },
    ],
  },

  /* ── Section 2 ──────────────────────────────────────────────────── */
  problem: {
    title: "Why Most Vision/NLP Projects Never Make It Past the Notebook",
    intro: [
      "The pattern is familiar: a data scientist trains a YOLOv8 model on 200 labeled images, achieves 0.87 mAP on a held-out test set, demos it to leadership, and the project stalls. The model needs 50,000 more labeled images to handle real-world variation. It runs at 7 FPS on the factory-floor edge device, not 30 FPS. It misclassifies when lighting shifts by 30%. Nobody owns the data pipeline, the eval suite, or the deployment infrastructure.",
      "The root cause is structural: production vision and NLP systems are 20% model and 80% data engineering, deployment engineering and operations. Teams that optimise the 20% (model architecture, hyperparameters) and ignore the 80% (data quality, edge latency, monitoring) ship demos, not systems. By the time the gap becomes obvious, the project has burned 6 months and the original data scientist has moved on.",
    ],
    painPoints: [
      {
        title: "Data is the bottleneck, not the model",
        description:
          "A YOLOv8 model trained on 200 images overfits to those images; the same architecture trained on 50,000 diverse, well-labeled images achieves 0.92 mAP on production traffic. Most teams have no labeling pipeline, no active-learning loop, no data-quality monitoring — and ship a model that craters the first time it sees a real factory-floor image with motion blur and bad lighting.",
      },
      {
        title: "Edge latency targets are unforgiving",
        description:
          "A model that runs at 30ms per inference on an A100 runs at 280ms on a Raspberry Pi 5. Most factory, retail and field-deployment use cases have hard latency budgets (≤50ms for real-time defect detection, ≤200ms for shelf analytics). Without quantization, ONNX export and TensorRT optimization, the model cannot meet the budget — and the project is re-scoped or killed.",
      },
      {
        title: "No eval, no improvement loop",
        description:
          "A vision model without a held-out eval set drawn from production traffic is unmeasurable. Teams ship a model with 0.87 mAP on a curated test set, then have no signal when production accuracy drops to 0.74 due to drift. Without per-class metrics, confusion matrices and a continuous-eval pipeline, the model degrades silently until a customer complains.",
      },
      {
        title: "Drift breaks production within 6 months",
        description:
          "A defect-detection model trained on winter lighting conditions misclassifies 18% of defects by summer because the lighting changed. A document-classification model trained on 2023 templates fails when the template updates in 2025. Without drift detection and retraining pipelines, vision and NLP systems decay on a predictable 3–9 month cycle.",
      },
    ],
    paradigmShift: [
      "A production vision or NLP system is not a model — it is a pipeline of cooperating components: a data-ingestion layer that pulls from cameras, sensors or document stores; a labeling layer (human-in-the-loop plus auto-labeling); a training layer with versioned datasets and reproducible experiments; an eval layer with per-class metrics and production-traffic sampling; a deployment layer with quantization, ONNX export and device-specific runtimes; and a monitoring layer that detects drift and triggers retraining. We engineer all six as one system, then operate it under a mAP and latency SLA. The deliverable is not a notebook; it is a measurable service that runs at 30 FPS on the edge, 24/7, with a quarterly retraining cadence.",
    ],
  },

  /* ── Section 3 ──────────────────────────────────────────────────── */
  deepDive: {
    title: "What Exactly Is a Production Vision or NLP System?",
    intro: [
      "A production vision/NLP system is a stack of cooperating components, not a single trained model. Understanding each layer — and choosing the right architecture for your task — is the difference between a system that runs at 30 FPS on the edge for 3 years and one that demo'd once and was never seen again.",
    ],
    subsections: [
      {
        heading: "The model architectures: picking the right tool for the task",
        body: [
          "Vision tasks split into four families, each with a dominant architecture. Object detection (find and localize objects in an image) uses YOLOv8/v9/v10 for real-time use cases (30+ FPS on edge) and DETR or RT-DETR for higher accuracy when latency budget allows. Image classification (assign one label per image) uses ResNet-50/101 for proven robustness, ConvNeXt for modern accuracy, and ViT (Vision Transformer) for tasks where the dataset exceeds 1M images. Segmentation (per-pixel labeling) uses SAM (Segment Anything Model) for zero-shot segmentation, Mask R-CNN for instance segmentation, and U-Net for medical/biomedical images.",
          "OCR splits into traditional (Tesseract — fast, free, weak on complex layouts) and deep-learning-based (PaddleOCR — 12% higher accuracy on real-world documents, supports 80+ languages, runs at 45ms per page on CPU). For document AI (forms, invoices, contracts), we combine OCR with a layout-aware transformer (LayoutLMv3 or Donut) that reads text and layout jointly — this lifts field-extraction accuracy from ~78% (OCR + regex) to ~94% (OCR + layout model). NLP tasks use encoder models (BERT, RoBERTa) for classification and NER, encoder-decoder models (T5, BART) for summarization, and decoder models (GPT, Llama) for generation.",
        ],
        jargon: [
          { term: "mAP@0.5", def: "Mean Average Precision at IoU threshold 0.5 — the standard object-detection metric. 0.85+ is production-grade for most industrial use cases; 0.95+ is achievable for constrained environments (e.g. fixed camera, controlled lighting)." },
          { term: "IoU", def: "Intersection over Union — the overlap between a predicted bounding box and the ground-truth box, ranging 0–1. IoU ≥ 0.5 counts as a correct detection in mAP@0.5." },
          { term: "F1 score", def: "Harmonic mean of precision and recall, used for classification and NER. F1 = 2 × (precision × recall) / (precision + recall). Production NER systems target F1 ≥ 0.90." },
        ],
      },
      {
        heading: "Data engineering: the 80% that determines success",
        body: [
          "A model is only as good as its training data. We treat data engineering as the primary discipline, not an afterthought. The pipeline starts with ingestion — pulling images from RTSP camera feeds, documents from S3/SharePoint, or text from Postgres/Kafka — into a versioned data lake. We deduplicate via perceptual hashing (pHash for images, MinHash for text), PII-redact at ingestion, and tag each sample with metadata (camera ID, timestamp, lighting conditions, document template version).",
          "Labeling combines auto-labeling (a baseline model labels new data; humans review only low-confidence cases) and active learning (the model flags the samples that, once labeled, would most reduce its uncertainty). For a 50K-image industrial defect-detection dataset, this cuts labeling cost from $150K (full human labeling at $3/image) to $35K (auto-labeling + 12K human-reviewed samples). We use CVAT, Label Studio and Roboflow for image annotation; Prodigy and Doccano for NLP annotation. Every dataset is versioned in DVC, with reproducible training runs tied to dataset versions.",
        ],
        jargon: [
          { term: "Active learning", def: "A training strategy where the model selects which unlabeled samples a human should label next — picking the ones that most reduce model uncertainty. Cuts labeling cost 4–10x versus random sampling." },
          { term: "Auto-labeling", def: "Using a baseline model to label new data automatically; humans review only low-confidence cases. Throughput: 5K–50K samples per day with 1–2 annotators." },
          { term: "Data augmentation", def: "Synthetic transformations (rotation, flip, color jitter, mosaic for vision; synonym swap, back-translation for NLP) that expand the effective training set. Lifts mAP 3–8% on small datasets." },
        ],
      },
      {
        heading: "Edge deployment: ONNX, TensorRT, CoreML, TFLite",
        body: [
          "An edge-deployed vision model must hit a hard latency budget on constrained hardware. We convert PyTorch models to ONNX (the interchange format), then to device-specific runtimes: TensorRT for NVIDIA Jetson (Orin NX, AGX), CoreML for Apple devices (iPhone, iPad, Mac), TFLite for Android and ARM-based edge devices, and OpenVINO for Intel hardware. Quantization — converting FP32 weights to INT8 — cuts model size 4x and inference latency 2–3x with typically <1% mAP loss.",
          "A typical deployment: YOLOv8m model at 25.8MB FP32, quantized to 6.5MB INT8, runs at 8ms per inference on NVIDIA Jetson Orin NX (vs. 22ms FP32), 18ms on Raspberry Pi 5 with TFLite, and 6ms on iPhone 15 Pro with CoreML. For real-time defect detection on a 30 FPS production line, the Jetson Orin NX handles the full pipeline (ingest → preprocess → inference → postprocess → PLC output) at 31ms end-to-end — under the 33ms frame budget. Without quantization and TensorRT, the same model misses 12% of frames.",
        ],
      },
      {
        heading: "Evaluation: per-class metrics and continuous monitoring",
        body: [
          "A vision or NLP system without an eval suite is unmeasurable software. We build every production model with a held-out test set of 1,000+ samples drawn from production-traffic distribution (not the training distribution — that is the cardinal sin of CV eval). The eval reports per-class precision, recall and F1, a confusion matrix, mAP@0.5 and mAP@0.5:0.95 for detection, and per-class sample counts so we know if a low score is real or an artifact of an under-represented class.",
          "Post-deployment, we sample 1–5% of production predictions, send them to a human reviewer (or a larger model), and compute live accuracy. When live accuracy drops below threshold — typically 5% below eval-set accuracy — the system triggers an alert and queues the recent samples for labeling and retraining. This is how we catch drift: a defect-detection model that drops from 0.92 mAP to 0.78 mAP over 4 months as lighting conditions shift gets caught in week 2, not month 4. The retraining pipeline (auto-label + active learn + retrain + eval + canary deploy) runs quarterly for most clients.",
        ],
      },
    ],
  },

  /* ── Section 4 ──────────────────────────────────────────────────── */
  techStack: {
    title: "Tech Stack: What We Build With",
    intro: [
      "Our CV/NLP stack is opinionated and battle-tested across 41 production deployments. Every component below has survived a real production incident — a factory-floor lighting change that cratered mAP, an edge device that overheated, a model that doubled in latency after an ONNX export bug — not just a clean demo in a Jupyter notebook.",
    ],
    categories: [
      {
        name: "Vision models & frameworks",
        items: [
          { name: "YOLOv8 / YOLOv9 / YOLOv10 (Ultralytics)", description: "Real-time object detection. 0.89+ mAP@0.5 at 30+ FPS on Jetson Orin NX. Our default for industrial, retail and security use cases." },
          { name: "RT-DETR / DETR", description: "Transformer-based detectors. Higher accuracy than YOLO at the cost of latency — used when accuracy matters more than FPS." },
          { name: "ResNet-50/101 / ConvNeXt / ViT", description: "Image classification architectures. ResNet for proven robustness; ViT for datasets >1M images; ConvNeXt as the modern CNN baseline." },
          { name: "SAM / SAM 2 (Segment Anything)", description: "Zero-shot segmentation by Meta. Used as a labeling accelerator and for tasks where class boundaries are ambiguous." },
          { name: "PaddleOCR / Tesseract / LayoutLMv3", description: "OCR stack: PaddleOCR for real-world documents, Tesseract for clean scans, LayoutLMv3 for form/invoice field extraction." },
        ],
      },
      {
        name: "NLP models & frameworks",
        items: [
          { name: "BERT / RoBERTa / DeBERTa-v3", description: "Encoder models for classification, NER and sentiment. Fine-tuned in 1–4 GPU-hours on a single A100; F1 0.90+ on most production NER tasks." },
          { name: "T5 / BART / BART-large", description: "Encoder-decoder models for summarization and translation. Used for abstractive summarization where extractive methods miss the point." },
          { name: "Sentence Transformers / E5 / BGE", description: "Embedding models for retrieval, clustering and semantic search. 384–1024 dimensions; runs on CPU at 12ms per query." },
          { name: "spaCy / Stanza", description: "Production NLP libraries for tokenization, NER, dependency parsing. Used when latency budget is <10ms and a fine-tuned transformer is overkill." },
          { name: "Hugging Face Transformers + Datasets", description: "The lingua franca of NLP. Model hub, dataset hub, training loops, eval suites — our default starting point for any NLP task." },
        ],
      },
      {
        name: "Training, deployment & ops",
        items: [
          { name: "PyTorch Lightning + W&B", description: "Training framework with experiment tracking. Every run logged with hyperparameters, metrics, model artifacts and dataset versions for reproducibility." },
          { name: "ONNX / ONNX Runtime", description: "Interchange format and cross-platform runtime. PyTorch → ONNX is the first step of every edge deployment." },
          { name: "TensorRT / TensorRT-LLM", description: "NVIDIA's inference optimizer. 2–4x latency reduction over ONNX Runtime on Jetson and datacenter GPUs. INT8 quantization with <1% mAP loss." },
          { name: "CoreML / TFLite / OpenVINO", description: "Device-specific runtimes: CoreML for Apple, TFLite for Android and ARM, OpenVINO for Intel. Quantized models deploy to mobile at 5–20ms latency." },
          { name: "CVAT / Label Studio / Roboflow", description: "Annotation tools: CVAT for images and video, Label Studio for multi-modal, Roboflow for end-to-end CV with auto-labeling and dataset versioning." },
        ],
      },
    ],
    comparisonTable: {
      headers: ["Capability", "Notebook prototype", "ClickTake Production Vision/NLP"],
      rows: [
        ["Training data", "no:200 hand-labeled images", "yes:50K+ versioned, active-learning pipeline"],
        ["Eval set", "no:Same as training set", "yes:1,000+ held-out production-distribution samples"],
        ["Per-class metrics", "no:Single mAP number", "yes:Per-class P/R/F1 + confusion matrix"],
        ["Edge latency", "no:280ms on Pi (unusable)", "yes:<50ms via TensorRT/CoreML/TFLite"],
        ["Drift detection", "no", "yes:Live accuracy monitoring + auto-retrain trigger"],
        ["Device targets", "no:Laptop GPU only", "yes:Jetson, Raspberry Pi, iPhone, Android, Intel"],
        ["Retraining cadence", "no:Never", "yes:Quarterly auto-retrain with eval gate"],
        ["Reproducibility", "no:Lost notebook", "yes:W&B + DVC + git — every run reproducible"],
      ],
    },
  },

  /* ── Section 5 ──────────────────────────────────────────────────── */
  methodology: {
    title: "Methodology: From Discovery to Production in 5 Phases",
    intro: [
      "We ship production CV/NLP systems in 8–16 weeks using a fixed five-phase lifecycle. Each phase ends with a deliverable you can review and a gate you can pass or fail — no vague 'sprint demos' where the team shows a notebook running on a held-out test set.",
    ],
    steps: [
      {
        phase: "Phase 1",
        title: "Discovery & Use-Case Spec",
        duration: "Week 1–2",
        deliverables: ["Use-case brief", "Latency/throughput budget", "Eval rubric", "Hardware target list", "Cost model"],
        description:
          "We define the exact inference the model must make, the production hardware it will run on, and the latency budget per inference. A defect-detection use case on a 30 FPS production line has a 33ms hard budget; a document-classification use case on a cloud API has a 2-second soft budget. We draft the eval rubric — per-class targets, mAP threshold, F1 floor — before writing any training code. We model cost per inference, monthly run-rate at projected volume, and the break-even point versus your current solution.",
      },
      {
        phase: "Phase 2",
        title: "Data Engineering & Labeling",
        duration: "Week 2–5",
        deliverables: ["Ingestion pipeline", "Versioned dataset (DVC)", "Labeling workflow", "Initial 10K+ labeled samples"],
        description:
          "We ingest your raw data — RTSP camera feeds, image archives, document stores, text corpora — into a versioned data lake. We deduplicate, PII-redact, and tag each sample with metadata. We set up the labeling workflow: CVAT or Label Studio for human annotation, a baseline model for auto-labeling, and an active-learning loop that prioritizes the most informative samples. By end of week 5, the dataset has 10K–50K labeled samples with per-class balance and metadata tagging.",
      },
      {
        phase: "Phase 3",
        title: "Model Training & Eval",
        duration: "Week 5–9",
        deliverables: ["Trained model", "Eval report (per-class metrics)", "Confusion matrix", "Hyperparameter sweep results"],
        description:
          "We train the model on the versioned dataset using PyTorch Lightning, with W&B tracking every run. We sweep architectures (YOLOv8s/m/l, ResNet-50/101, ViT-Base) and hyperparameters (learning rate, batch size, augmentation policy). We evaluate on a held-out test set of 1,000+ production-distribution samples, reporting per-class precision/recall/F1, mAP@0.5, mAP@0.5:0.95 and confusion matrices. By end of week 9, the model typically hits the eval target — 0.85+ mAP for detection, 0.90+ F1 for NER — the threshold for entering deployment hardening.",
      },
      {
        phase: "Phase 4",
        title: "Edge Deployment & Optimization",
        duration: "Week 9–12",
        deliverables: ["ONNX export", "Quantized model (INT8)", "Device runtime (TensorRT/CoreML/TFLite)", "Latency benchmark report"],
        description:
          "We export the PyTorch model to ONNX, then optimize for each target device: TensorRT for NVIDIA Jetson, CoreML for Apple, TFLite for Android/ARM, OpenVINO for Intel. We quantize to INT8 with calibration on 500 production-distribution samples, verifying <1% mAP loss. We benchmark end-to-end latency on each device and tune the preprocessing pipeline (resize, normalize, batch) to hit the latency budget. By end of week 12, the model runs in production on the target hardware at the target latency.",
      },
      {
        phase: "Phase 5",
        title: "Monitoring, Drift Detection & Operations",
        duration: "Week 12–16",
        deliverables: ["Drift-detection dashboard", "Auto-retrain pipeline", "Runbook", "On-call rotation", "Quarterly retrain cadence"],
        description:
          "We deploy a monitoring layer that samples 1–5% of production predictions, sends them to a human reviewer or larger model, and computes live accuracy. When live accuracy drops 5% below eval-set accuracy, the system queues recent samples for labeling and triggers a retrain. We write the incident runbook (lighting-change response, device-overheating mitigation, model-rollback procedure) and either operate under a managed SLA or hand off to your team after a 4-week shadow period. Post-launch, we run a quarterly retrain with the auto-label + active-learn + eval-gate pipeline.",
      },
    ],
  },

  /* ── Section 6 ──────────────────────────────────────────────────── */
  useCases: {
    title: "Industry Use Cases: Where Vision & NLP Compound Value",
    intro: [
      "The use cases below are drawn from production deployments shipped between 2023 and 2026. Each card describes the specific business problem, the system we built, and the measurable result — not aspirational AI hype.",
    ],
    cases: [
      {
        industry: "Manufacturing Defect Detection",
        problem: "A 4-line electronics factory inspected PCBs for 14 defect classes (solder bridges, missing components, misaligned chips, etc.) via human inspectors. Inspection took 28 seconds per board, missed 6% of defects, and cost $1.2M/year in inspector labor.",
        application: "A YOLOv8m model deployed on NVIDIA Jetson Orin NX at each production line, running at 30 FPS with 8ms inference latency. Trained on 38,000 labeled images (auto-labeled from a baseline model, human-reviewed for low-confidence cases). Per-class eval: 0.91 mean mAP@0.5, 0.94 on the 5 highest-volume defect classes.",
        result: "Inspection time fell from 28s to 0.4s per board. Missed-defect rate fell from 6% to 0.8%. Inspector headcount dropped from 12 to 4 (the remaining inspectors handle edge cases and labeling for retraining). $890K/year in labor savings.",
      },
      {
        industry: "Retail Shelf Analytics",
        problem: "A 240-store FMCG brand audited shelf compliance via human auditors visiting each store monthly. 28% of audits found stockouts or mismerchandised SKUs; the lag between issue and detection averaged 18 days.",
        application: "A vision pipeline running on store-associate iPhones: associate photographs the shelf, the YOLOv8 model detects each SKU, compares against the planogram, and flags stockouts/misplacements in real time. Trained on 22,000 shelf images across 4 product categories.",
        result: "Shelf audits run weekly instead of monthly (4x frequency). Stockout detection latency fell from 18 days to 2 days. Out-of-stock revenue loss dropped 31% in pilot stores. The model runs at 18ms per inference on iPhone 13+.",
      },
      {
        industry: "Healthcare Imaging Triage",
        problem: "A radiology practice had a 6-hour turnaround on X-ray reads during off-hours; 4% of pneumothorax cases were under-triaged as routine.",
        application: "A ViT-Base classifier trained on 84,000 annotated X-rays (NIH ChestX-ray14 + practice's own data). Triages incoming X-rays into urgent (suspected pneumothorax, pleural effusion) vs. routine. Runs on-prem at 220ms per image; radiologist reviews the prompt's triage before acting.",
        result: "Off-hours turnaround fell from 6 hours to 22 minutes. Under-triage rate on pneumothorax fell from 4% to 0.6%. Radiologist first-read time dropped 31% as urgent cases surfaced to the top of the queue.",
      },
      {
        industry: "Document Processing & OCR",
        problem: "An insurance claims team manually processed 12,000 inbound documents per month (claim forms, medical records, police reports). Average processing time: 9 minutes per document; field-extraction error rate: 14%.",
        application: "A PaddleOCR + LayoutLMv3 pipeline that extracts 47 fields per document, classifies the document type, and routes to the appropriate claims handler. Trained on 18,000 annotated documents. Outputs structured JSON validated against a Pydantic schema.",
        result: "Processing time fell from 9 minutes to 38 seconds per document. Field-extraction error rate fell from 14% to 2.8%. Manual processing time dropped 71%. Average claim-closure time fell 3.1 days.",
      },
      {
        industry: "Retail Analytics & Customer Behavior",
        problem: "A mall operator sold footfall analytics to tenants based on door-counter sensors that counted bodies but provided no demographic or dwell-time data. Tenants churned at 18% annually citing poor analytics.",
        application: "A vision pipeline on ceiling-mounted Jetson devices that detects and tracks customers (anonymized — no facial recognition, just bounding boxes with age-range and gender classification). Outputs footfall, dwell time, peak hours, and demographic breakdown per zone. Trained on 50,000 frames with strict privacy review.",
        result: "Tenant analytics product expanded from raw footfall to 14 metrics. Tenant churn fell from 18% to 9% annually. Average tenant contract value rose 22% as analytics became a paid add-on.",
      },
    ],
  },

  /* ── Section 7 ──────────────────────────────────────────────────── */
  comparison: {
    title: "Comparative Analysis: Custom CV/NLP vs. Alternatives",
    intro: [
      "An objective comparison of the four approaches most teams consider before engaging us. We have shipped all four — the right choice depends on your accuracy requirement, latency budget, edge constraints, and team size.",
    ],
    tables: [
      {
        title: "ClickTake Custom CV/NLP vs. Off-the-shelf API vs. No-code vision platform vs. In-house build",
        headers: ["Dimension", "Off-the-shelf API", "No-code platform", "In-house build", "ClickTake Custom System"],
        rows: [
          ["Time to production", "yes:2–4 weeks", "yes:4–8 weeks", "no:9–18 months", "yes:8–16 weeks"],
          ["Domain accuracy", "no:~65% on niche classes", "no:~72%", "yes:90%+", "yes:88–94%"],
          ["Edge deployment", "no:Cloud only", "no:Cloud only", "yes", "yes:Jetson/Pi/iPhone/Android/Intel"],
          ["Latency on edge", "no:200ms+ (network)", "no:200ms+ (network)", "yes:<50ms", "yes:<50ms (TensorRT/TFLite)"],
          ["Eval suite", "no", "no", "maybe", "yes:1,000+ held-out cases"],
          ["Drift detection", "no", "no", "no", "yes:Live accuracy + auto-retrain"],
          ["Cost at 1M inferences/mo", "yes:$4K–$12K (API)", "yes:$3K–$8K", "yes:$2K + 3 FTEs", "yes:$800–$3K (self-hosted edge)"],
          ["Vendor lock-in", "no:High", "no:High", "yes:None", "yes:Low (open-source models)"],
          ["Best for", "Generic object detection", "Small teams, simple tasks", "Enterprises with 8+ ML engineers", "Production edge-deployed systems"],
        ],
      },
      {
        title: "Model architecture selection — vision tasks",
        headers: ["Task", "Default architecture", "Latency (Jetson Orin NX)", "Accuracy (typical)"],
        rows: [
          ["Object detection", "YOLOv8m", "8ms INT8", "mAP@0.5 0.89"],
          ["Real-time detection (edge)", "YOLOv8s + TensorRT", "5ms INT8", "mAP@0.5 0.85"],
          ["High-accuracy detection", "RT-DETR-L", "32ms FP16", "mAP@0.5 0.93"],
          ["Image classification", "ResNet-50 / ConvNeXt-T", "3ms INT8", "Top-1 acc 0.94"],
          ["Classification (large dataset)", "ViT-Base", "11ms FP16", "Top-1 acc 0.96"],
          ["Semantic segmentation", "SAM ViT-H (mask head)", "85ms FP16", "mIoU 0.84"],
          ["OCR (clean documents)", "Tesseract 5", "20ms CPU", "F1 0.91"],
          ["OCR (real-world documents)", "PaddleOCR + LayoutLMv3", "45ms CPU / 12ms GPU", "F1 0.94"],
        ],
      },
    ],
  },

  /* ── Section 8 ──────────────────────────────────────────────────── */
  businessImpact: {
    title: "Business Impact: Accuracy, Latency, Labor & Risk",
    intro: [
      "Production CV/NLP systems earn their budget back through four mechanisms: labor cost reduction (automating visual or text inspection humans currently do), throughput lift (faster inspection/classification than humans), quality lift (lower miss-rate than human inspectors), and risk reduction (catching defects/errors before they cause incidents). The numbers below are aggregated across 41 production deployments shipped 2023–2026.",
    ],
    metrics: [
      { value: "87%", label: "Avg. labor cost reduction", description: "On the automated inspection or processing workflow." },
      { value: "30x", label: "Avg. throughput lift", description: "Inferences per second vs. human inspectors/processers." },
      { value: "<1%", label: "Avg. miss-rate", description: "On defects/errors, down from 4–9% with human inspectors." },
      { value: "<50ms", label: "Edge inference latency", description: "Median across deployed edge devices (Jetson, Pi, iPhone)." },
    ],
    body: [
      "Labor cost reduction is the most measurable impact and typically funds the engagement. A 12-person inspection team costing $1.2M/year (fully-loaded) is reduced to a 4-person team handling edge cases and labeling, saving $890K/year. The CV system that delivers this costs $180K–$350K to build and $1.5K–$4K/month to operate (edge hardware amortised over 3 years). The payback period is 3–6 months. Document-processing use cases show similar economics: a 14-person claims-processing team reduced to 4 saves $720K/year against a $140K build cost.",
      "Throughput lift compounds the labor savings. A human inspector handles 120 boards per hour; a CV system handles 3,600 per hour at 30 FPS. The same production line runs 30x more product through the same inspection station without adding headcount. For a factory running 24/7, this means defects are caught on 100% of output instead of a 5% statistical sample. Quality lift flows directly to warranty cost: a 5-percentage-point reduction in defect escape rate, on a $40M/year product line with 2% defect rate and $80 average warranty cost per defect, avoids $320K/year in warranty claims.",
      "Risk reduction is the impact category most often ignored — until the first avoided incident. A pharmaceutical manufacturer's vision system catches 99.4% of label defects versus 94% with human inspectors; the avoided FDA-reportable incidents and recalls are worth $2M–$20M each. A radiology practice's triage model catches pneumothorax cases 4.2 hours faster on average; the avoided litigation exposure per missed case averages $480K. These savings rarely appear on the original ROI spreadsheet; they show up in the year-two risk-management review.",
    ],
  },

  /* ── Section 9 ──────────────────────────────────────────────────── */
  integrations: {
    title: "Integrations & Ecosystem",
    intro: [
      "CV/NLP systems do not live in isolation. They sit inside your camera/sensor infrastructure, your document stores, your application stack, and your analytics platform. The lists below cover the integrations we ship most often — if your stack uses a different vendor on any layer, we have likely integrated with it before.",
    ],
    categories: [
      {
        name: "Vision data sources",
        items: ["RTSP / IP camera feeds (Hikvision, Dahua, Axis)", "USB cameras (Logitech, industrial)", "iPhone/iPad camera (CoreML)", "Android camera (CameraX + TFLite)", "Industrial cameras (Basler, FLIR)", "Drone imagery (DJI SDK)", "Satellite imagery (Sentinel, Planet)", "Medical imaging (DICOM via Orthanc)"],
      },
      {
        name: "NLP data sources",
        items: ["PostgreSQL / MySQL / SQL Server", "Elasticsearch / OpenSearch", "Kafka / Kinesis (streaming)", "S3 / Azure Blob / GCS", "SharePoint / OneDrive / Google Drive", "Email (IMAP / Microsoft Graph)", "Slack / Teams / Zendesk export", "PDF / DOCX / HTML (Apache Tika)"],
      },
      {
        name: "Edge & cloud runtimes",
        items: ["NVIDIA Jetson (Orin NX, AGX Orin, Nano)", "Raspberry Pi 5 / 4", "Intel NUC / x86 servers", "AWS Greengrass / IoT Core", "Apple CoreML (iPhone, iPad, Mac)", "Android TFLite / NNAPI", "Tencent NCNN / Alibaba MNN", "Cloud GPUs (A10G, L4, A100, H100)"],
      },
      {
        name: "Ops & observability",
        items: ["Weights & Biases (experiment tracking)", "DVC (dataset versioning)", "MLflow (model registry)", "Datadog / New Relic (infra)", "Prometheus / Grafana (custom metrics)", "CVAT / Label Studio / Roboflow (annotation)", "ClearML / Prefect (pipeline orchestration)", "SageMaker / Vertex AI (managed training)"],
      },
    ],
    compliance: ["GDPR", "HIPAA", "SOC 2 Type II", "ISO 27001", "FDA 21 CFR Part 11 (pharma imaging)", "EU AI Act readiness assessment", "Anonymization-by-design (no facial recognition in retail analytics)", "Edge-only processing for PII imagery"],
  },

  /* ── Section 10 ─────────────────────────────────────────────────── */
  caseStudies: {
    title: "Case Studies: Two Production Deployments in Detail",
    intro: [
      "Below are two anonymized but factual case studies from 2024–2025 deployments. Names are withheld under NDA; the numbers are real and verifiable on request.",
    ],
    studies: [
      {
        client: "Mid-sized electronics manufacturer, 4 PCB assembly lines, ~£180M revenue",
        situation: "The factory inspected PCBs for 14 defect classes (solder bridges, missing components, misaligned chips, lifted leads, etc.) via 12 human inspectors across 3 shifts. Inspection took 28 seconds per board. Missed-defect rate: 6%. Escaped defects caused an average of $42 in rework per board at the next-stage test, plus 1 customer-return incident per quarter averaging $180K in cost.",
        task: "Deploy a real-time vision system on each of the 4 production lines that inspects every board at 30 FPS, achieves >0.85 mAP@0.5 on the 14 defect classes, runs on edge hardware (no cloud dependency), and integrates with the existing Siemens PLC to physically divert defective boards to a rework station.",
        action: "ClickTake deployed 4 NVIDIA Jetson Orin NX devices (one per line), each running a YOLOv8m model exported to TensorRT INT8 (8ms inference latency). We trained the model on 38,000 labeled images — auto-labeled by a YOLOv8x baseline model, human-reviewed by the existing inspector team for low-confidence cases via CVAT. We exported to ONNX, then to TensorRT with INT8 quantization calibrated on 500 production-distribution images (mAP loss: 0.7%). We integrated with the Siemens PLC via Modbus TCP for the divert-gate signal. The eval suite of 2,400 held-out production samples ran in CI on every model change.",
        result: "Inspection time fell from 28s to 0.4s per board (system inspects every board at 30 FPS, 100% coverage vs. previous statistical sample). Missed-defect rate fell from 6% to 0.8%. Inspector headcount dropped from 12 to 4 (the remaining inspectors handle edge cases, labeling for retraining, and second-pass review of borderline calls). Annual labor savings: $890K. Avoided rework cost: $1.1M/year. The system has run for 14 months with one quarterly retrain; live accuracy is monitored via 5% sampling of production predictions sent to a human reviewer.",
        quote: {
          text: "We were about to hire a 13th inspector. Instead we have 4 inspectors doing more interesting work and a system that catches defects the humans were missing. The ROI was there in month 4.",
          author: "VP of Manufacturing",
          title: "Mid-sized electronics manufacturer",
        },
      },
      {
        client: "National insurance provider, 4.2M policies in force, ~£2.8B annual premium",
        situation: "The claims team processed 12,000 inbound documents per month (claim forms, medical records, police reports, repair estimates) via 14 human processors. Average processing time: 9 minutes per document. Field-extraction error rate: 14% — wrong claimant name, misread policy number, incorrect date of loss. Average claim-closure time: 11.4 days. Customer NPS: 31.",
        task: "Build a document-processing pipeline that extracts 47 fields per document, classifies document type, routes to the appropriate claims handler, and reduces field-extraction error rate to under 5% — without sending customer PII to a third-party API.",
        action: "ClickTake deployed a self-hosted PaddleOCR + LayoutLMv3 pipeline on AWS p4d instances inside a HIPAA-adjacent VPC. PaddleOCR ran the text recognition; LayoutLMv3 read the text jointly with layout to extract structured fields. We trained on 18,000 annotated documents (existing claims + synthetic edge cases). The output was a Pydantic-validated DocumentExtraction object with 47 typed fields, confidence scores per field, and a refusal behaviour for low-confidence fields that triggered human review. The eval suite of 2,800 held-out documents ran in CI on every model change. We integrated with the existing Guidewire ClaimCenter via REST API, with row-level security ensuring each handler only saw documents for their assigned claims.",
        result: "Processing time fell from 9 minutes to 38 seconds per document. Field-extraction error rate fell from 14% to 2.8% on auto-extracted fields. Manual processing time dropped 71% — the 14-person team shifted from data entry to claims adjudication. Average claim-closure time fell from 11.4 days to 8.2 days. Customer NPS rose from 31 to 47 over 9 months (correlated with faster closure). The system now processes 18,000 documents per month (volume grew with policy growth).",
        quote: {
          text: "Our claims handlers used to spend their days typing claimant names and policy numbers. Now they spend their days actually adjudicating claims. The job we hired them to do is finally the job they get to do.",
          author: "Head of Claims Operations",
          title: "National insurance provider",
        },
      },
    ],
  },

  /* ── Section 11 ─────────────────────────────────────────────────── */
  faq: {
    title: "Frequently Asked Questions",
    intro: [
      "Grouped by category. If your question is not here, book a 30-minute call — we answer most strategy questions in the first 10 minutes.",
    ],
    categories: [
      {
        name: "Pricing & Timelines",
        questions: [
          {
            q: "How much does a production CV/NLP system cost to build?",
            a: "Build cost ranges from $80K (single-task vision pipeline with 10K-image dataset, cloud deployment, basic eval) to $480K (multi-task system, 50K+ image dataset, edge deployment on 3+ device targets, full drift-detection and auto-retrain pipeline, 6-month managed SLA). The dominant cost drivers are: dataset size and labeling cost, model complexity, edge device targets, and compliance requirements. We provide a fixed quote after the 2-week discovery phase.",
          },
          {
            q: "What is the typical timeline from kickoff to production?",
            a: "8–16 weeks. Single-task cloud-deployed vision systems ship in 8–10 weeks. Multi-task edge-deployed systems take 12–16 weeks. The 5-phase lifecycle is: Discovery (2 weeks), Data Engineering (4 weeks), Training & Eval (4 weeks), Edge Deployment (4 weeks), Monitoring & Ops (4 weeks — overlaps with deployment). Edge device procurement can add 2–3 weeks for lead time on Jetson hardware.",
          },
          {
            q: "What does ongoing operations cost?",
            a: "Monthly run cost ranges from $800 (low-volume cloud-deployed model) to $9K (high-volume multi-model edge deployment with managed SLA). Edge hardware amortises over 3 years (Jetson Orin NX: $600/device; iPhone/iPad: existing hardware; Raspberry Pi 5: $80/device). Managed SLA from ClickTake adds $3K–$8K/month including drift monitoring, quarterly retrains, and on-call coverage. Most clients start with managed SLA and migrate to self-operation after 6–12 months.",
          },
          {
            q: "Do we need to provide the labeled dataset?",
            a: "No — but it accelerates the engagement if you have one. We can build the dataset from scratch: ingest your raw data, set up auto-labeling with a baseline model, run an active-learning loop, and have 10K–50K labeled samples within 3–4 weeks. If you already have a labeled dataset, we audit it (class balance, label quality, train/test leakage) and integrate it. Either way, you own the dataset at the end of the engagement.",
          },
        ],
      },
      {
        name: "Technical Specs",
        questions: [
          {
            q: "Which edge devices do you support?",
            a: "NVIDIA Jetson (Orin NX, AGX Orin, Orin Nano, Xavier NX) for high-throughput vision; Raspberry Pi 5/4 with TFLite for low-power vision and NLP; iPhone/iPad via CoreML for retail and field use cases; Android via TFLite/NNAPI; Intel NUC and x86 servers via OpenVINO; AWS Greengrass and Azure IoT Edge for managed edge deployments. We select the device per use case based on latency budget, power constraints, and existing hardware.",
          },
          {
            q: "What is your typical latency profile?",
            a: "Edge (Jetson Orin NX, INT8): 5–12ms per inference for YOLOv8, 3–6ms for ResNet-50. Edge (Raspberry Pi 5, TFLite): 18–45ms for YOLOv8s, 12ms for MobileNetV3. Mobile (iPhone 15 Pro, CoreML): 6–14ms for YOLOv8s, 4ms for MobileNetV3. Cloud (A100 GPU): 4–8ms for YOLOv8m, 220ms for ViT-Base on 1024x1024 image. End-to-end pipeline (preprocess + inference + postprocess + downstream action) adds 15–25ms on top of model latency.",
          },
          {
            q: "How do you handle data privacy for camera/imagery data?",
            a: "Three approaches, used in combination: (1) edge-only processing — imagery never leaves the device, only structured inferences (bounding boxes, counts) are sent to the cloud; (2) on-device anonymization — faces and license plates are blurred at capture time before any storage or transmission; (3) selective retention — original imagery is deleted within 24 hours, only the model's structured output is retained. For retail analytics we use edge-only processing with no facial recognition, only bounding-box tracking with age-range and gender classification. For medical imaging we deploy inside HIPAA-scoped VPCs.",
          },
          {
            q: "How do you handle drift?",
            a: "Continuous eval on production traffic. We sample 1–5% of production predictions, send them to a human reviewer (or a larger model), and compute live accuracy. When live accuracy drops 5% below eval-set accuracy, the system triggers an alert and queues the recent samples for labeling. The auto-retrain pipeline (auto-label + active-learn + retrain + eval-gate + canary-deploy) runs quarterly for most clients. Median time from drift detection to retrained model in production: 8 days.",
          },
        ],
      },
      {
        name: "Security & Compliance",
        questions: [
          {
            q: "Are you GDPR / HIPAA / SOC2 compliant?",
            a: "We architect for all three. HIPAA: self-hosted model deployments inside HIPAA-scoped VPCs with BAAs in place with AWS and Azure. GDPR: EU data residency via self-hosted deployments in eu-west regions; right-to-be-forgotten implemented in dataset versioning; anonymization-by-design for any imagery containing people. SOC2 Type II: ClickTake's operations are SOC2-aligned; we provide architecture documentation including the CI/CD pipeline, access controls, and audit logs to support your SOC2 audit.",
          },
          {
            q: "Can the system run inside our VPC?",
            a: "Yes. We deploy self-hosted models on your AWS, GCP, Azure or on-prem GPU infrastructure. Training data, model weights, and inference traffic never leave your network. Edge-deployed models run on devices you own; only structured inferences are sent to the cloud (if at all). We support NVIDIA A10G, L4, A100, H100 GPUs for training; Jetson, Pi, and Intel hardware for edge inference.",
          },
          {
            q: "Do you use facial recognition?",
            a: "No — for retail and customer-analytics use cases, we use anonymized bounding-box tracking without facial recognition. We track customers as anonymous IDs within a single visit (no cross-visit tracking), classify age-range and gender via body-shape analysis (not face), and delete original imagery within 24 hours. For use cases that require facial recognition (e.g. access control), we deploy on a strict opt-in basis with explicit consent flows and on-device processing — but this is rare and we counsel clients toward anonymized alternatives.",
          },
          {
            q: "Who owns the trained model and dataset?",
            a: "You do. All trained model weights, labeled datasets, training code, eval suites, and deployment configs built during the engagement are your IP, deliverable in a Git repository and an S3 bucket at the end of the project. We retain no rights to your proprietary work. You can take it to another vendor or operate it in-house at any time.",
          },
        ],
      },
      {
        name: "Working with ClickTake",
        questions: [
          {
            q: "Where are your engineering teams based?",
            a: "Engineering hubs in Birmingham (UK) and Multan (Pakistan), with business-development desks in Austin (USA) and Dubai (UAE). Most CV/NLP engagements are staffed across the UK and Pakistan hubs, giving you UK business-hours coverage plus an extended Pakistan delivery window. Manufacturing projects get a UK-based lead engineer for on-site integration; retail and field-deployment projects often rely on the Pakistan team for labeling and data-engineering scale.",
          },
          {
            q: "Do you handle edge hardware procurement?",
            a: "Yes. We can procure NVIDIA Jetson devices, Raspberry Pi hardware, industrial cameras (Basler, FLIR), and networking equipment through our supplier network — typically 2–3 week lead time. You own the hardware. We also support bring-your-own-hardware if you have an existing supplier relationship or standardized device fleet.",
          },
          {
            q: "What happens after launch?",
            a: "Three options: (1) ClickTake operates the system under a managed SLA ($3K–$8K/month) including drift monitoring, quarterly retrains, and on-call coverage; (2) ClickTake hands off to your team after a 4-week shadow period with full runbook and training; (3) Hybrid — ClickTake handles quarterly retrains and major incidents, your team handles day-to-day monitoring. Most clients start with option 1 and migrate to option 3 after 6–12 months.",
          },
        ],
      },
    ],
  },

  /* ── Section 12 ─────────────────────────────────────────────────── */
  finalCta: {
    title: "Ready to Ship a Vision or NLP System That Runs on the Edge?",
    subtitle:
      "Book a free 30-minute strategy call. We will review your use case, sketch the data pipeline and deployment architecture on a whiteboard with you, and tell you honestly whether a custom CV/NLP system is the right answer — or whether an off-the-shelf API would do the job at lower cost.",
    steps: [
      {
        step: "1",
        title: "Book a 30-min strategy call",
        description: "Free. No deck. We diagnose your use case, latency budget, and edge constraints, and tell you whether custom CV/NLP is the right call.",
      },
      {
        step: "2",
        title: "2-week discovery phase",
        description: "$8K fixed. We ingest a sample of your data, train a baseline model, benchmark on your target hardware, and quote the full engagement.",
      },
      {
        step: "3",
        title: "Receive fixed-price proposal",
        description: "Timeline, deliverables, monthly run cost, mAP/latency SLA — all fixed before any production work starts.",
      },
    ],
    primaryCta: { label: "Book a Free Strategy Call", href: "/contact", variant: "orange" },
    secondaryCta: { label: "Read the Vision Pipeline Brief", href: "/resources", variant: "outline" },
  },
}
