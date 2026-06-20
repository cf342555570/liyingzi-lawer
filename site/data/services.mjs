export const services = Object.freeze([
  { slug: "changsha-lihun-lawyer", name: "离婚纠纷", summary: "协议离婚、诉讼离婚、材料准备与处理路径判断" },
  { slug: "changsha-caili-fanhuan-lawyer", name: "彩礼返还", summary: "共同生活、款项性质与往来证据梳理" },
  { slug: "changsha-lihun-fangchan-fenge-lawyer", name: "离婚房产分割", summary: "父母出资、共同还贷、房本加名与按揭房处理" },
  { slug: "changsha-fuyangquan-lawyer", name: "子女抚养权", summary: "抚养安排、抚养权变更、抚养费与探望问题" },
  { slug: "changsha-lihun-xieyi-shencha-lawyer", name: "离婚协议审查", summary: "房产、债务、抚养与补偿条款的完整性审查" },
  { slug: "changsha-fuqi-gongtong-zhaiwu-lawyer", name: "夫妻共同债务", summary: "共同签字、家庭用途、共同经营与资金流向分析" },
  { slug: "changsha-hunnei-zengyu-fanhuan-lawyer", name: "婚内大额转账与赠与返还争议", summary: "资金来源、转账性质、双方关系与证据材料判断" },
  { slug: "changsha-lihun-tanpan-cailiao-lawyer", name: "离婚谈判与材料梳理", summary: "先列清财产、子女和债务，再判断谈判与后续路径" },
  { slug: "changsha-shewai-hunyin-lawyer", name: "涉外婚姻", summary: "涉外离婚、跨境财产与子女抚养的材料整理与处理路径判断" }
].map((service) => Object.freeze({ ...service, path: `/services/${service.slug}/` })));
