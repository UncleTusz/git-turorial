const SERVICE_CONFIG = {
  bridal: {
    title: '新娘妆造',
    tag: 'Bridal',
    intro: '为人生最重要的一天，定制从晨袍到晚宴的完整妆造方案。含婚前沟通、试妆定制与婚礼日全程跟妆。',
    highlights: [
      '婚前深度沟通与风格定位',
      '专属试妆与造型确认',
      '婚礼日全程跟妆服务',
    ],
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop&auto=format&q=80',
    imageAlt: '新娘妆造定制预约',
    requirementsPlaceholder: '请描述婚礼日期、仪式流程、偏好风格（如自然清透、复古优雅等）、是否需要跟妆至晚宴…',
  },
  event: {
    title: '红毯 / 活动',
    tag: 'Red Carpet',
    intro: '为重要公开场合打造经得起高清镜头与长时间持妆考验的精致形象，助你在聚光灯下自信登场。',
    highlights: [
      '高清镜头级妆面处理',
      '长时间持妆与快速补妆',
      '整体造型与配饰协调',
    ],
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=600&fit=crop&auto=format&q=80',
    imageAlt: '红毯活动妆造预约',
    requirementsPlaceholder: '请描述活动名称、着装风格、活动时长、是否有媒体拍摄或红毯环节…',
  },
  editorial: {
    title: '时尚大片',
    tag: 'Editorial',
    intro: '与摄影团队紧密协作，为杂志封面、品牌广告与个人形象照提供富有创意的高级妆造方案。',
    highlights: [
      '创意妆造与拍摄风格匹配',
      '与摄影师、造型师协作',
      '多组造型快速切换',
    ],
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&h=600&fit=crop&auto=format&q=80',
    imageAlt: '时尚大片妆造预约',
    requirementsPlaceholder: '请描述拍摄主题、参考风格、预计拍摄时长、是否需要多组造型…',
  },
  private: {
    title: '私人形象课',
    tag: 'Private Session',
    intro: '一对一传授适合您的日常妆容技巧与发型打理方法，建立可持续的个人美学体系。',
    highlights: [
      '个人骨相与肤质分析',
      '日常妆容实操教学',
      '专属产品与工具建议',
    ],
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&h=600&fit=crop&auto=format&q=80',
    imageAlt: '私人形象课预约',
    requirementsPlaceholder: '请描述您希望学习的妆容类型、日常场合、目前遇到的化妆困扰…',
  },
};

const SERVICE_BUTTON_CLASS = {
  bridal: 'btn--service-bridal',
  event: 'btn--service-event',
  editorial: 'btn--service-editorial',
  private: 'btn--service-private',
};

const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const bookingForm = document.getElementById('serviceBookingForm');

function getServiceKey() {
  const params = new URLSearchParams(window.location.search);
  const service = params.get('service');
  return SERVICE_CONFIG[service] ? service : 'bridal';
}

function renderServicePage(serviceKey) {
  const config = SERVICE_CONFIG[serviceKey];

  document.title = `${config.title} · 专属预约 · Regina`;
  document.getElementById('serviceTag').textContent = config.tag;
  document.getElementById('serviceTitle').textContent = config.title;
  document.getElementById('serviceIntro').textContent = config.intro;

  const highlightsEl = document.getElementById('serviceHighlights');
  highlightsEl.innerHTML = config.highlights
    .map((item) => `<li>${item}</li>`)
    .join('');

  const imageEl = document.getElementById('serviceImage');
  imageEl.src = config.image;
  imageEl.alt = config.imageAlt;

  document.getElementById('serviceType').value = serviceKey;
  document.getElementById('serviceName').value = config.title;
  document.getElementById('requirements').placeholder = config.requirementsPlaceholder;

  const submitBtn = document.getElementById('serviceSubmitBtn');
  if (submitBtn) {
    submitBtn.classList.remove(
      'btn--primary',
      'btn--service-bridal',
      'btn--service-event',
      'btn--service-editorial',
      'btn--service-private'
    );
    submitBtn.classList.add(SERVICE_BUTTON_CLASS[serviceKey] || 'btn--service-bridal');
  }
}

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

if (bookingForm) {
  bookingForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const serviceName = document.getElementById('serviceName').value;
    alert(`感谢您的预约！\n\n已收到您的「${serviceName}」专属预约信息，Regina 团队将在 24 小时内与您联系。`);
    bookingForm.reset();
    document.getElementById('serviceType').value = getServiceKey();
    document.getElementById('serviceName').value = SERVICE_CONFIG[getServiceKey()].title;
  });
}

renderServicePage(getServiceKey());
