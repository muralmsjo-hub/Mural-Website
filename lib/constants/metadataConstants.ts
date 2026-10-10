export const SITE_TITLE = process.env.APP_NAME ?? "Mural";

export const SITE_DESCRIPTION =
  process.env.APP_DESCRIPTION ??
  "Mural - Leading provider of high-quality medical supplies and healthcare solutions";

export const siteMetadata = {
  en: {
    title: "Mural",
    description:
      "Leading provider of high-quality medical supplies, equipment, and healthcare solutions in Saudi Arabia.",
  },
  ar: {
    title: "اللوحة الجدارية للمستلزمات الطبية",
    description:
      "الرائدة في تقديم المستلزمات والأجهزة والحلول الطبية عالية الجودة للمؤسسات الصحية والمتخصصين في المملكة العربية السعودية.",
  },
};

export const SITE_URL = process.env.APP_URL ?? "http://localhost:3000";

export type PageName =
  | "home"
  | "aboutUs"
  | "categories"
  | "products"
  | "partners"
  | "submitPurchaseRequest"
  | "careers"
  | "login"
  | "register"
  | "changePassword"
  | "resetPassword"
  | "forgotPassword"
  | "verifyEmail";

export type DynamicMetadataType =
  | "products"
  | "careers"
  | "applications";

export const COMMON_KEYWORDS = [
  "Mural",
  "Mural Medical",
  "Medical Supplies",
  "Healthcare Solutions",
  "Medical Equipment",
  "Saudi Arabia Medical Supplies",
  "B2B Medical Procurement",
  "Hospital Equipment",
  "اللوحة الجدارية للمستلزمات الطبية",
  "المستلزمات الطبية",
  "الأجهزة الطبية",
  "حلول الرعاية الصحية",
  "المعدات الطبية",
  "مستلزمات المستشفيات السعودية",
] as const;

export const staticMetadata: Record<
  PageName,
  {
    en: { title: string; description: string };
    ar: { title: string; description: string };
  }
> = {
  home: {
    en: {
      title: "Home",
      description:
        "Discover our premium medical supplies, equipment, and healthcare solutions from top global manufacturers.",
    },
    ar: {
      title: "الرئيسية",
      description:
        "اكتشف أحدث المستلزمات والأجهزة والحلول الطبية من أبرز الشركاء والمصنعين العالميين.",
    },
  },

  aboutUs: {
    en: {
      title: "About Us",
      description:
        "Learn more about Mural, our history, mission, and commitment to providing top-quality medical supplies and solutions.",
    },
    ar: {
      title: "من نحن",
      description:
        "تعرّف على اللوحة الجدارية للمستلزمات الطبية، ورؤيتنا ورسالتنا والتزامنا بتقديم أعلى مستويات الجودة في القطاع الطبي.",
    },
  },

  categories: {
    en: {
      title: "Medical Categories",
      description:
        "Explore our product categories and find specialized medical supplies and equipment for healthcare institutions.",
    },
    ar: {
      title: "فئات المستلزمات الطبية",
      description:
        "استكشف فئات المستلزمات والأجهزة الطبية واعثر على المنتجات المناسبة لاحتياجات منشأتك الصحية.",
    },
  },

  products: {
    en: {
      title: "Products Catalog",
      description:
        "Explore our comprehensive catalog of certified medical products and healthcare equipment.",
    },
    ar: {
      title: "المنتجات الطبية",
      description:
        "تصفح الكتالوج الشامل للمنتجات والمستلزمات الطبية المعتمدة عالية الجودة.",
    },
  },

  partners: {
    en: {
      title: "Our Partners",
      description:
        "Discover our trusted international manufacturing partners supplying world-class medical equipment and solutions.",
    },
    ar: {
      title: "شركاؤنا",
      description:
        "تعرّف على شبكة شركائنا العالميين الموثوقين في تصنيع وتوريد المستلزمات والأجهزة الطبية.",
    },
  },

  submitPurchaseRequest: {
    en: {
      title: "Submit Purchase Request",
      description:
        "Submit a B2B purchase order request for medical supplies and request an official quotation.",
    },
    ar: {
      title: "تقديم طلب شراء",
      description:
        "قدّم طلب شراء للمستلزمات والمعدات الطبية واحصل على عرض سعر رسمي لمؤسستك أو منشأتك الصحية.",
    },
  },

  careers: {
    en: {
      title: "Careers",
      description:
        "Explore career opportunities at Mural and join our team in advancing medical supply solutions.",
    },
    ar: {
      title: "الوظائف",
      description:
        "استكشف الفرص الوظيفية المتاحة وانضم إلى فريق اللوحة الجدارية للمستلزمات الطبية.",
    },
  },

 

  login: {
    en: {
      title: "Login",
      description:
        "Log in to your account to access your purchase requests, saved products, and account details.",
    },
    ar: {
      title: "تسجيل الدخول",
      description:
        "سجّل الدخول إلى حسابك لدى اللوحة الجدارية للمستلزمات الطبية لمتابعة طلبات الشراء ومفضلتك.",
    },
  },

  register: {
    en: {
      title: "Create an Account",
      description:
        "Create an account to manage B2B medical supply requests and quotations efficiently.",
    },
    ar: {
      title: "إنشاء حساب",
      description:
        "أنشئ حسابك الجديد لدى اللوحة الجدارية للمستلزمات الطبية لتسهيل طلبات الشراء وإدارة الحساب.",
    },
  },

  changePassword: {
    en: {
      title: "Change Password",
      description: "Change your account password to keep your account secure.",
    },
    ar: {
      title: "تغيير كلمة المرور",
      description: "غيّر كلمة مرور حسابك للحفاظ على أمان حسابك.",
    },
  },

  resetPassword: {
    en: {
      title: "Reset Password",
      description:
        "Reset your password and regain secure access to your account.",
    },
    ar: {
      title: "إعادة تعيين كلمة المرور",
      description: "أعد تعيين كلمة المرور واستعد الوصول الآمن إلى حسابك.",
    },
  },

  forgotPassword: {
    en: {
      title: "Forgot Password",
      description:
        "Forgot your password? Enter your email address to reset your password.",
    },
    ar: {
      title: "نسيت كلمة المرور",
      description:
        "هل نسيت كلمة المرور؟ أدخل بريدك الإلكتروني لإعادة تعيين كلمة المرور.",
    },
  },

  verifyEmail: {
    en: {
      title: "Verify Email",
      description:
        "Verify your email address to activate and secure your account.",
    },
    ar: {
      title: "تأكيد البريد الإلكتروني",
      description: "أكد بريدك الإلكتروني لتفعيل حسابك والحفاظ على أمانه.",
    },
  },
};
