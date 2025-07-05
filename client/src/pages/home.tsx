import { useEffect } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

// Enhanced animation variants with smoother easing
// Gentler animations for non-hero sections
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { 
    duration: 0.6, 
    ease: [0.25, 0.1, 0.25, 1.0]
  }
};

const fadeInScale = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { 
    duration: 0.6, 
    ease: [0.25, 0.1, 0.25, 1.0]
  }
};

const slideInLeft = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { 
    duration: 0.6, 
    ease: [0.25, 0.1, 0.25, 1.0]
  }
};

const slideInRight = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  transition: { 
    duration: 0.6, 
    ease: [0.25, 0.1, 0.25, 1.0]
  }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05
    }
  }
};

const staggerItem = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  transition: { 
    duration: 0.5, 
    ease: [0.25, 0.1, 0.25, 1.0]
  }
};

const floatingAnimation = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Enhanced animated section components
function AnimatedSection({ children, className = "", variant = "fadeInUp" }: { 
  children: React.ReactNode; 
  className?: string;
  variant?: "fadeInUp" | "fadeInScale" | "slideInLeft" | "slideInRight";
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  const variants = {
    fadeInUp,
    fadeInScale,
    slideInLeft,
    slideInRight
  };

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      variants={variants[variant]}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ParallaxSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.8, 1, 1, 0.8]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StaggeredContainer({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StaggeredItem({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div variants={staggerItem} className={className}>
      {children}
    </motion.div>
  );
}

export default function Home() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  
  useEffect(() => {
    // Enhanced smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add custom CSS for smoother scrolling on all browsers
    const style = document.createElement('style');
    style.textContent = `
      html {
        scroll-behavior: smooth;
      }
      @media (prefers-reduced-motion: no-preference) {
        html {
          scroll-behavior: smooth;
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <motion.div 
      className="min-h-screen bg-black text-white overflow-x-hidden smooth-scroll"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section with Parallax */}
      <motion.section 
        id="home" 
        className="min-h-screen flex items-center justify-center section-spacing px-4 relative"
        style={{ y: heroY }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <AnimatedSection variant="fadeInScale">
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 gradient-text leading-tight"
              variants={floatingAnimation}
              animate="animate"
            >
              The AI Indian
            </motion.h1>
            <motion.p 
              className="text-sm md:text-base text-brand-grey-light mb-8 tracking-wide uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              Live and Virtual
            </motion.p>
          </AnimatedSection>
          <AnimatedSection variant="fadeInUp">
            <h2 className="text-xl md:text-3xl lg:text-4xl font-light mb-8 text-brand-grey-light max-w-4xl mx-auto leading-relaxed">
              Artificial Intelligence Research & Products
            </h2>
            <p className="text-base md:text-lg text-brand-grey-light max-w-3xl mx-auto leading-relaxed">
              Building AI technology in India for global needs while addressing uniquely Indian challenges. 
              Bridging gaps in AI applications for Indian contexts, languages, and cultural nuances.
            </p>
          </AnimatedSection>
        </div>
      </motion.section>

      {/* About Section */}
      <section id="about" className="section-spacing px-4 border-t border-brand-grey-dark">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="mb-16" variant="fadeInScale">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 gradient-text">About Us</h2>
            <p className="text-lg md:text-xl text-brand-grey-light leading-relaxed max-w-4xl">
              We are a forward-thinking artificial intelligence research and product company dedicated to creating 
              AI solutions that understand and serve the diverse needs of India while maintaining global relevance.
            </p>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            <AnimatedSection variant="slideInLeft">
              <h3 className="text-xl md:text-2xl font-semibold mb-6 text-white">Our Foundation</h3>
              <p className="text-brand-grey-light leading-relaxed mb-6">
                Founded with the vision to democratize AI technology for Indian markets, we combine deep technical 
                expertise with cultural understanding to build products that truly serve our diverse population.
              </p>
              <p className="text-brand-grey-light leading-relaxed">
                Our team brings together researchers, engineers, and domain experts who understand both the 
                technical complexities of AI and the nuanced requirements of Indian contexts.
              </p>
            </AnimatedSection>
            
            <AnimatedSection variant="slideInRight">
              <h3 className="text-xl md:text-2xl font-semibold mb-6 text-white">Our Approach</h3>
              <p className="text-brand-grey-light leading-relaxed mb-6">
                We believe in building AI that is not just technically advanced but also culturally aware and 
                contextually relevant. Our research focuses on multilingual capabilities, regional commerce 
                understanding, and culturally-sensitive AI applications.
              </p>
              <p className="text-brand-grey-light leading-relaxed">
                Through open source contributions and collaborative research, we aim to advance the entire 
                ecosystem of AI in India while maintaining the highest standards of ethical AI development.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="section-spacing px-4 border-t border-brand-grey-dark">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16" variant="fadeInScale">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 gradient-text">Mission & Vision</h2>
            <p className="text-lg text-brand-grey-light max-w-3xl mx-auto leading-relaxed">
              Driving the future of AI technology with a deep understanding of Indian contexts and global ambitions.
            </p>
          </AnimatedSection>
          
          <div className="space-y-16">
            <AnimatedSection>
              <div className="border border-brand-grey-dark rounded-lg p-8 md:p-12">
                <h3 className="text-2xl md:text-3xl font-bold mb-6 text-white">Our Mission</h3>
                <p className="text-lg text-brand-grey-light leading-relaxed mb-6">
                  To bridge the gaps in AI applications for Indian contexts by developing technology that 
                  understands our languages, cultural nuances, and market dynamics while maintaining 
                  world-class standards of innovation and research.
                </p>
                <StaggeredContainer className="grid md:grid-cols-3 gap-6 mt-8">
                  <StaggeredItem>
                    <h4 className="text-lg font-semibold text-white mb-3">Language Focus</h4>
                    <p className="text-brand-grey-light text-sm leading-relaxed">
                      Building AI that truly understands Indian languages, dialects, and communication patterns.
                    </p>
                  </StaggeredItem>
                  <StaggeredItem>
                    <h4 className="text-lg font-semibold text-white mb-3">Cultural Intelligence</h4>
                    <p className="text-brand-grey-light text-sm leading-relaxed">
                      Developing AI systems that respect and adapt to diverse cultural contexts and traditions.
                    </p>
                  </StaggeredItem>
                  <StaggeredItem>
                    <h4 className="text-lg font-semibold text-white mb-3">Market Relevance</h4>
                    <p className="text-brand-grey-light text-sm leading-relaxed">
                      Creating solutions that address real challenges in Indian markets and business environments.
                    </p>
                  </StaggeredItem>
                </StaggeredContainer>
              </div>
            </AnimatedSection>
            
            <AnimatedSection>
              <div className="border border-brand-grey-dark rounded-lg p-8 md:p-12">
                <h3 className="text-2xl md:text-3xl font-bold mb-6 text-white">Our Vision</h3>
                <p className="text-lg text-brand-grey-light leading-relaxed mb-6">
                  To become the leading AI research and product company that sets the standard for 
                  culturally-aware, multilingual AI systems, enabling technology that truly serves 
                  the diverse needs of India while contributing to global AI advancement.
                </p>
                <StaggeredContainer className="grid md:grid-cols-2 gap-8 mt-8">
                  <StaggeredItem>
                    <h4 className="text-lg font-semibold text-white mb-3">Global Impact</h4>
                    <p className="text-brand-grey-light text-sm leading-relaxed">
                      Influencing global AI development with insights from Indian diversity and complexity, 
                      contributing to more inclusive AI systems worldwide.
                    </p>
                  </StaggeredItem>
                  <StaggeredItem>
                    <h4 className="text-lg font-semibold text-white mb-3">Innovation Leadership</h4>
                    <p className="text-brand-grey-light text-sm leading-relaxed">
                      Pioneering research in multilingual AI, regional commerce intelligence, and 
                      culturally-sensitive machine learning applications.
                    </p>
                  </StaggeredItem>
                </StaggeredContainer>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section id="research" className="section-spacing px-4 border-t border-brand-grey-dark">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 gradient-text">Research Focus</h2>
            <p className="text-lg text-brand-grey-light max-w-3xl mx-auto leading-relaxed">
              Our research spans cutting-edge AI technologies with special emphasis on Indian contexts and multilingual capabilities.
            </p>
          </AnimatedSection>
          
          <div className="space-y-12">
            <AnimatedSection>
              <div className="border border-brand-grey-dark rounded-lg p-8 md:p-12">
                <h3 className="text-2xl md:text-3xl font-bold mb-6 text-white">Hindi Language Models</h3>
                <p className="text-lg text-brand-grey-light leading-relaxed mb-8">
                  Developing state-of-the-art language models specifically optimized for Hindi and related 
                  Indian languages, addressing unique linguistic challenges and cultural contexts.
                </p>
                <StaggeredContainer className="grid md:grid-cols-3 gap-6">
                  <StaggeredItem>
                    <h4 className="text-lg font-semibold text-white mb-3">Linguistic Accuracy</h4>
                    <p className="text-brand-grey-light text-sm leading-relaxed">
                      Advanced models that understand grammar, context, and cultural nuances specific to Hindi and regional dialects.
                    </p>
                  </StaggeredItem>
                  <StaggeredItem>
                    <h4 className="text-lg font-semibold text-white mb-3">Code-Switching</h4>
                    <p className="text-brand-grey-light text-sm leading-relaxed">
                      Intelligent handling of mixed-language communication patterns common in Indian contexts.
                    </p>
                  </StaggeredItem>
                  <StaggeredItem>
                    <h4 className="text-lg font-semibold text-white mb-3">Cultural Context</h4>
                    <p className="text-brand-grey-light text-sm leading-relaxed">
                      Models trained to understand cultural references, traditions, and context-specific communication styles.
                    </p>
                  </StaggeredItem>
                </StaggeredContainer>
              </div>
            </AnimatedSection>
            
            <AnimatedSection>
              <div className="border border-brand-grey-dark rounded-lg p-8 md:p-12">
                <h3 className="text-2xl md:text-3xl font-bold mb-6 text-white">Regional Commerce AI</h3>
                <p className="text-lg text-brand-grey-light leading-relaxed mb-8">
                  Specialized AI systems designed to understand and optimize regional commerce patterns, 
                  local market dynamics, and culturally-specific business practices across India.
                </p>
                <StaggeredContainer className="grid md:grid-cols-2 gap-8">
                  <StaggeredItem>
                    <h4 className="text-lg font-semibold text-white mb-3">Market Intelligence</h4>
                    <p className="text-brand-grey-light text-sm leading-relaxed">
                      AI-powered insights into regional preferences, seasonal patterns, and local market behavior 
                      to help businesses make informed decisions.
                    </p>
                  </StaggeredItem>
                  <StaggeredItem>
                    <h4 className="text-lg font-semibold text-white mb-3">Cultural Commerce</h4>
                    <p className="text-brand-grey-light text-sm leading-relaxed">
                      Understanding festival seasons, regional celebrations, and cultural events that drive 
                      commerce patterns across different states and communities.
                    </p>
                  </StaggeredItem>
                </StaggeredContainer>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section-spacing px-4 border-t border-brand-grey-dark">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 gradient-text">Featured Projects</h2>
            <p className="text-lg text-brand-grey-light max-w-3xl mx-auto leading-relaxed">
              Showcase of our key projects that demonstrate our commitment to advancing AI technology for Indian contexts.
            </p>
          </AnimatedSection>
          
          <div className="space-y-12">
            <AnimatedSection>
              <div className="border border-brand-grey-dark rounded-lg p-8 md:p-12">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-0">Indic-NLP</h3>
                  <span className="text-sm text-brand-grey-light bg-brand-grey-dark px-3 py-1 rounded-full">Open Source</span>
                </div>
                <p className="text-lg text-brand-grey-light leading-relaxed mb-6">
                  A comprehensive natural language processing toolkit specifically designed for Indian languages, 
                  providing developers and researchers with powerful tools for text processing, analysis, and understanding.
                </p>
                <StaggeredContainer className="grid md:grid-cols-3 gap-6">
                  <StaggeredItem>
                    <h4 className="text-lg font-semibold text-white mb-3">Multi-Script Support</h4>
                    <p className="text-brand-grey-light text-sm leading-relaxed">
                      Comprehensive support for Devanagari, Tamil, Telugu, Bengali, and other Indian scripts with advanced preprocessing capabilities.
                    </p>
                  </StaggeredItem>
                  <StaggeredItem>
                    <h4 className="text-lg font-semibold text-white mb-3">Language Detection</h4>
                    <p className="text-brand-grey-light text-sm leading-relaxed">
                      Accurate identification and classification of Indian languages and dialects with high precision for mixed-content scenarios.
                    </p>
                  </StaggeredItem>
                  <StaggeredItem>
                    <h4 className="text-lg font-semibold text-white mb-3">Semantic Analysis</h4>
                    <p className="text-brand-grey-light text-sm leading-relaxed">
                      Advanced semantic understanding tailored for Indian languages, including sentiment analysis and entity recognition.
                    </p>
                  </StaggeredItem>
                </StaggeredContainer>
              </div>
            </AnimatedSection>
            
            <AnimatedSection>
              <div className="border border-brand-grey-dark rounded-lg p-8 md:p-12">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-0">Regional Vision</h3>
                  <span className="text-sm text-brand-grey-light bg-brand-grey-dark px-3 py-1 rounded-full">Computer Vision</span>
                </div>
                <p className="text-lg text-brand-grey-light leading-relaxed mb-6">
                  Advanced computer vision system trained on Indian contexts, capable of understanding regional 
                  architecture, clothing, food, cultural artifacts, and environmental factors specific to Indian geography.
                </p>
                <StaggeredContainer className="grid md:grid-cols-2 gap-8">
                  <StaggeredItem>
                    <h4 className="text-lg font-semibold text-white mb-3">Cultural Recognition</h4>
                    <p className="text-brand-grey-light text-sm leading-relaxed">
                      AI models trained to recognize traditional clothing, architectural styles, cultural ceremonies, 
                      and regional artifacts with high accuracy and cultural sensitivity.
                    </p>
                  </StaggeredItem>
                  <StaggeredItem>
                    <h4 className="text-lg font-semibold text-white mb-3">Environmental Understanding</h4>
                    <p className="text-brand-grey-light text-sm leading-relaxed">
                      Sophisticated recognition of Indian landscapes, weather patterns, agricultural settings, 
                      and urban environments for context-aware applications.
                    </p>
                  </StaggeredItem>
                </StaggeredContainer>
              </div>
            </AnimatedSection>
            
            <AnimatedSection>
              <div className="border border-brand-grey-dark rounded-lg p-8 md:p-12">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-0">Multilingual Assistant</h3>
                  <span className="text-sm text-brand-grey-light bg-brand-grey-dark px-3 py-1 rounded-full">AI Assistant</span>
                </div>
                <p className="text-lg text-brand-grey-light leading-relaxed mb-6">
                  Intelligent conversational AI assistant capable of seamless communication across multiple Indian 
                  languages, understanding cultural context, and providing culturally-appropriate responses.
                </p>
                <StaggeredContainer className="grid md:grid-cols-3 gap-6">
                  <StaggeredItem>
                    <h4 className="text-lg font-semibold text-white mb-3">Cross-Language Understanding</h4>
                    <p className="text-brand-grey-light text-sm leading-relaxed">
                      Seamless conversation flow across Hindi, English, Tamil, Bengali, and other regional languages within a single interaction.
                    </p>
                  </StaggeredItem>
                  <StaggeredItem>
                    <h4 className="text-lg font-semibold text-white mb-3">Cultural Awareness</h4>
                    <p className="text-brand-grey-light text-sm leading-relaxed">
                      Responses that respect cultural norms, festivals, traditions, and regional preferences for more authentic interactions.
                    </p>
                  </StaggeredItem>
                  <StaggeredItem>
                    <h4 className="text-lg font-semibold text-white mb-3">Contextual Intelligence</h4>
                    <p className="text-brand-grey-light text-sm leading-relaxed">
                      Understanding of Indian social contexts, business practices, and communication styles for relevant assistance.
                    </p>
                  </StaggeredItem>
                </StaggeredContainer>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Open Source Section */}
      <section id="opensource" className="section-spacing px-4 border-t border-brand-grey-dark">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 gradient-text">Open Source</h2>
            <p className="text-lg text-brand-grey-light max-w-3xl mx-auto leading-relaxed">
              We believe in the power of open collaboration to advance AI technology and make it accessible to everyone.
            </p>
          </AnimatedSection>
          
          <div className="space-y-12">
            <AnimatedSection>
              <div className="border border-brand-grey-dark rounded-lg p-8 md:p-12 text-center">
                <h3 className="text-2xl md:text-3xl font-bold mb-6 text-white">Our Open Source Philosophy</h3>
                <p className="text-lg text-brand-grey-light leading-relaxed mb-8 max-w-4xl mx-auto">
                  We are committed to democratizing AI technology by making our research and tools freely available 
                  to the global community. Through open source contributions, we enable researchers, developers, 
                  and organizations worldwide to build upon our work and create innovative solutions.
                </p>
                <StaggeredContainer className="grid md:grid-cols-3 gap-8">
                  <StaggeredItem>
                    <h4 className="text-lg font-semibold text-white mb-3">Collaborative Innovation</h4>
                    <p className="text-brand-grey-light text-sm leading-relaxed">
                      Working with the global AI community to advance research and share knowledge across borders and institutions.
                    </p>
                  </StaggeredItem>
                  <StaggeredItem>
                    <h4 className="text-lg font-semibold text-white mb-3">Accessibility</h4>
                    <p className="text-brand-grey-light text-sm leading-relaxed">
                      Making advanced AI tools accessible to researchers and developers regardless of their institutional resources.
                    </p>
                  </StaggeredItem>
                  <StaggeredItem>
                    <h4 className="text-lg font-semibold text-white mb-3">Transparency</h4>
                    <p className="text-brand-grey-light text-sm leading-relaxed">
                      Maintaining open and transparent development processes that allow for peer review and community feedback.
                    </p>
                  </StaggeredItem>
                </StaggeredContainer>
              </div>
            </AnimatedSection>
            
            <div className="grid md:grid-cols-2 gap-8">
              <AnimatedSection>
                <div className="border border-brand-grey-dark rounded-lg p-6 md:p-8">
                  <h4 className="text-xl font-semibold text-white mb-4">Community Contributions</h4>
                  <p className="text-brand-grey-light text-sm leading-relaxed mb-4">
                    Our open source projects have been adopted by researchers and developers across the globe, 
                    contributing to advancements in multilingual AI and culturally-aware systems.
                  </p>
                  <div className="text-brand-grey-light text-sm">
                    <p className="mb-2">• 10,000+ downloads of Indic-NLP toolkit</p>
                    <p className="mb-2">• 500+ contributors to Regional Vision project</p>
                    <p className="mb-2">• 50+ research papers citing our work</p>
                    <p>• Active community across 15+ countries</p>
                  </div>
                </div>
              </AnimatedSection>
              
              <AnimatedSection>
                <div className="border border-brand-grey-dark rounded-lg p-6 md:p-8">
                  <h4 className="text-xl font-semibold text-white mb-4">Future Initiatives</h4>
                  <p className="text-brand-grey-light text-sm leading-relaxed mb-4">
                    We are continuously expanding our open source offerings and planning new initiatives 
                    to further democratize AI technology for Indian and global contexts.
                  </p>
                  <div className="text-brand-grey-light text-sm">
                    <p className="mb-2">• Comprehensive language model training framework</p>
                    <p className="mb-2">• Cultural bias detection and mitigation tools</p>
                    <p className="mb-2">• Regional commerce AI APIs</p>
                    <p>• Educational resources and tutorials</p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="section-spacing px-4 border-t border-brand-grey-dark">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 gradient-text">Technology & Approach</h2>
            <p className="text-lg text-brand-grey-light max-w-3xl mx-auto leading-relaxed">
              Our technology philosophy combines cutting-edge AI research with deep understanding of Indian contexts and global best practices.
            </p>
          </AnimatedSection>
          
          <div className="space-y-12">
            <AnimatedSection>
              <div className="border border-brand-grey-dark rounded-lg p-8 md:p-12">
                <h3 className="text-2xl md:text-3xl font-bold mb-6 text-white">Development Philosophy</h3>
                <p className="text-lg text-brand-grey-light leading-relaxed mb-8">
                  We believe in building AI systems that are not just technically sophisticated but also 
                  ethically sound, culturally sensitive, and practically useful for real-world applications.
                </p>
                <StaggeredContainer className="grid md:grid-cols-3 gap-6">
                  <StaggeredItem>
                    <h4 className="text-lg font-semibold text-white mb-3">Ethical AI</h4>
                    <p className="text-brand-grey-light text-sm leading-relaxed">
                      Commitment to developing AI systems that respect privacy, promote fairness, and avoid harmful biases, 
                      particularly in multicultural contexts.
                    </p>
                  </StaggeredItem>
                  <StaggeredItem>
                    <h4 className="text-lg font-semibold text-white mb-3">Scalable Architecture</h4>
                    <p className="text-brand-grey-light text-sm leading-relaxed">
                      Building systems that can scale from local applications to global deployments while maintaining 
                      performance and cultural relevance.
                    </p>
                  </StaggeredItem>
                  <StaggeredItem>
                    <h4 className="text-lg font-semibold text-white mb-3">Continuous Learning</h4>
                    <p className="text-brand-grey-light text-sm leading-relaxed">
                      Implementing systems that can adapt and improve over time through user interactions and 
                      feedback while maintaining stability.
                    </p>
                  </StaggeredItem>
                </StaggeredContainer>
              </div>
            </AnimatedSection>
            
            <div className="grid md:grid-cols-2 gap-8">
              <AnimatedSection>
                <div className="border border-brand-grey-dark rounded-lg p-6 md:p-8">
                  <h4 className="text-xl font-semibold text-white mb-4">Technical Stack</h4>
                  <p className="text-brand-grey-light text-sm leading-relaxed mb-6">
                    Our technology stack combines proven frameworks with cutting-edge research tools, 
                    optimized for performance and multilingual capabilities.
                  </p>
                  <div className="space-y-4">
                    <StaggeredContainer>
                      <StaggeredItem>
                        <h5 className="text-md font-medium text-white mb-2">Machine Learning</h5>
                        <p className="text-brand-grey-light text-sm">PyTorch, TensorFlow, Transformers, Custom Neural Architectures</p>
                      </StaggeredItem>
                      <StaggeredItem>
                        <h5 className="text-md font-medium text-white mb-2">Language Processing</h5>
                        <p className="text-brand-grey-light text-sm">Custom tokenizers, Multi-script handling, Cross-lingual embeddings</p>
                      </StaggeredItem>
                      <StaggeredItem>
                        <h5 className="text-md font-medium text-white mb-2">Infrastructure</h5>
                        <p className="text-brand-grey-light text-sm">Cloud-native deployment, Kubernetes, Edge computing capabilities</p>
                      </StaggeredItem>
                    </StaggeredContainer>
                  </div>
                </div>
              </AnimatedSection>
              
              <AnimatedSection>
                <div className="border border-brand-grey-dark rounded-lg p-6 md:p-8">
                  <h4 className="text-xl font-semibold text-white mb-4">Research Methodology</h4>
                  <p className="text-brand-grey-light text-sm leading-relaxed mb-6">
                    Our research approach combines rigorous scientific methodology with practical application testing 
                    in real-world Indian contexts.
                  </p>
                  <div className="space-y-4">
                    <StaggeredContainer>
                      <StaggeredItem>
                        <h5 className="text-md font-medium text-white mb-2">Data Collection</h5>
                        <p className="text-brand-grey-light text-sm">Diverse, representative datasets with cultural and linguistic coverage</p>
                      </StaggeredItem>
                      <StaggeredItem>
                        <h5 className="text-md font-medium text-white mb-2">Model Training</h5>
                        <p className="text-brand-grey-light text-sm">Multi-stage training with cultural awareness and bias detection</p>
                      </StaggeredItem>
                      <StaggeredItem>
                        <h5 className="text-md font-medium text-white mb-2">Validation</h5>
                        <p className="text-brand-grey-light text-sm">Real-world testing across diverse Indian user groups and contexts</p>
                      </StaggeredItem>
                    </StaggeredContainer>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-spacing px-4 border-t border-brand-grey-dark">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 gradient-text">Contact Us</h2>
            <p className="text-lg text-brand-grey-light max-w-3xl mx-auto leading-relaxed">
              Ready to collaborate or learn more about our work? We'd love to hear from you.
            </p>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            <AnimatedSection>
              <div className="border border-brand-grey-dark rounded-lg p-8 md:p-12">
                <h3 className="text-2xl font-bold mb-6 text-white">Get in Touch</h3>
                <p className="text-lg text-brand-grey-light leading-relaxed mb-8">
                  Whether you're interested in collaboration, research partnerships, or learning more about our products, 
                  we're always open to meaningful conversations about AI technology.
                </p>
                <div className="space-y-6">
                  <StaggeredContainer>
                    <StaggeredItem>
                      <h4 className="text-lg font-semibold text-white mb-2">Research Collaboration</h4>
                      <p className="text-brand-grey-light text-sm leading-relaxed">
                        Partner with us on cutting-edge AI research projects focused on Indian contexts and multilingual applications.
                      </p>
                    </StaggeredItem>
                    <StaggeredItem>
                      <h4 className="text-lg font-semibold text-white mb-2">Product Integration</h4>
                      <p className="text-brand-grey-light text-sm leading-relaxed">
                        Integrate our AI technologies into your products and services to better serve Indian markets.
                      </p>
                    </StaggeredItem>
                    <StaggeredItem>
                      <h4 className="text-lg font-semibold text-white mb-2">Open Source Contributions</h4>
                      <p className="text-brand-grey-light text-sm leading-relaxed">
                        Join our open source community and contribute to democratizing AI technology.
                      </p>
                    </StaggeredItem>
                  </StaggeredContainer>
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection>
              <div className="border border-brand-grey-dark rounded-lg p-8 md:p-12">
                <h3 className="text-2xl font-bold mb-6 text-white">Company Information</h3>
                <div className="space-y-6">
                  <StaggeredContainer>
                    <StaggeredItem>
                      <h4 className="text-lg font-semibold text-white mb-2">Email</h4>
                      <p className="text-brand-grey-light text-sm">contact@theaiindian.com</p>
                      <p className="text-brand-grey-light text-sm">research@theaiindian.com</p>
                    </StaggeredItem>
                    <StaggeredItem>
                      <h4 className="text-lg font-semibold text-white mb-2">Location</h4>
                      <p className="text-brand-grey-light text-sm">Bangalore, India</p>
                      <p className="text-brand-grey-light text-sm">Global Remote Team</p>
                    </StaggeredItem>
                    <StaggeredItem>
                      <h4 className="text-lg font-semibold text-white mb-2">Office Hours</h4>
                      <p className="text-brand-grey-light text-sm">Monday - Friday: 9:00 AM - 6:00 PM IST</p>
                      <p className="text-brand-grey-light text-sm">Research discussions available 24/7</p>
                    </StaggeredItem>
                    <StaggeredItem>
                      <h4 className="text-lg font-semibold text-white mb-2">Social</h4>
                      <div className="space-y-1">
                        <p className="text-brand-grey-light text-sm">GitHub: @theaiindian</p>
                        <p className="text-brand-grey-light text-sm">LinkedIn: The AI Indian</p>
                        <p className="text-brand-grey-light text-sm">Twitter: @theaiindian</p>
                      </div>
                    </StaggeredItem>
                  </StaggeredContainer>
                </div>
              </div>
            </AnimatedSection>
          </div>
          
          <AnimatedSection className="text-center mt-16">
            <div className="border-t border-brand-grey-dark pt-8">
              <p className="text-brand-grey-light text-sm">
                © 2024 The AI Indian. Building the future of artificial intelligence for India and the world.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </motion.div>
  );
}
