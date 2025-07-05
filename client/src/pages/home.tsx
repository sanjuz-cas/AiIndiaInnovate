import { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Hero section animations only
const fadeInScale = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { 
    duration: 1.0, 
    ease: [0.25, 0.1, 0.25, 1.0],
    type: "spring",
    damping: 20,
    stiffness: 80
  }
};

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { 
    duration: 1.2, 
    ease: [0.25, 0.1, 0.25, 1.0],
    type: "spring",
    damping: 25,
    stiffness: 100
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

export default function Home() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    
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
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInScale}
          >
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
          </motion.div>
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
          >
            <h2 className="text-xl md:text-3xl lg:text-4xl font-light mb-8 text-brand-grey-light max-w-4xl mx-auto leading-relaxed">
              Artificial Intelligence Research & Products
            </h2>
            <p className="text-base md:text-lg text-brand-grey-light max-w-3xl mx-auto leading-relaxed">
              Building AI technology in India for global needs while addressing uniquely Indian challenges. 
              Bridging gaps in AI applications for Indian contexts, languages, and cultural nuances.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* About Section - Simple Responsive */}
      <section id="about" className="section-spacing px-4 border-t border-brand-grey-dark">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 gradient-text">About Us</h2>
            <p className="text-lg md:text-xl text-brand-grey-light leading-relaxed max-w-4xl">
              We are a forward-thinking artificial intelligence research and product company dedicated to creating 
              AI solutions that understand and serve the diverse needs of India while maintaining global relevance.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <h3 className="text-xl md:text-2xl font-semibold mb-6 text-white">Our Foundation</h3>
              <p className="text-brand-grey-light leading-relaxed mb-6">
                Founded with the vision to democratize AI technology for Indian markets, we combine deep technical 
                expertise with cultural understanding to build products that truly serve our diverse population.
              </p>
              <p className="text-brand-grey-light leading-relaxed">
                Our team brings together researchers, engineers, and domain experts who understand both the 
                technical complexities of AI and the nuanced requirements of Indian contexts.
              </p>
            </div>
            
            <div>
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
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section - Simple Responsive */}
      <section id="mission" className="section-spacing px-4 border-t border-brand-grey-dark">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 gradient-text">Mission & Vision</h2>
            <p className="text-lg text-brand-grey-light max-w-3xl mx-auto leading-relaxed">
              Driving the future of AI technology with a deep understanding of Indian contexts and global ambitions.
            </p>
          </div>
          
          <div className="space-y-16">
            <div>
              <div className="border border-brand-grey-dark rounded-lg p-8 md:p-12">
                <h3 className="text-2xl md:text-3xl font-bold mb-6 text-white">Our Mission</h3>
                <p className="text-lg text-brand-grey-light leading-relaxed mb-6">
                  To bridge the gaps in AI applications for Indian contexts by developing technology that 
                  understands our languages, cultural nuances, and market dynamics while maintaining 
                  world-class standards of innovation and research.
                </p>
                <div className="grid md:grid-cols-3 gap-6 mt-8">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Language Focus</h4>
                    <p className="text-brand-grey-light text-sm leading-relaxed">
                      Building AI that truly understands Indian languages, dialects, and communication patterns.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Cultural Intelligence</h4>
                    <p className="text-brand-grey-light text-sm leading-relaxed">
                      Developing AI systems that respect and adapt to diverse cultural contexts and traditions.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Market Relevance</h4>
                    <p className="text-brand-grey-light text-sm leading-relaxed">
                      Creating solutions that address real challenges in Indian markets and business environments.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="border border-brand-grey-dark rounded-lg p-8 md:p-12">
                <h3 className="text-2xl md:text-3xl font-bold mb-6 text-white">Our Vision</h3>
                <p className="text-lg text-brand-grey-light leading-relaxed mb-6">
                  To become the leading AI research and product company that sets the standard for 
                  culturally-aware, multilingual AI systems, enabling technology that truly serves 
                  the diverse needs of India while contributing to global AI advancement.
                </p>
                <div className="grid md:grid-cols-2 gap-8 mt-8">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Global Impact</h4>
                    <p className="text-brand-grey-light text-sm leading-relaxed">
                      Influencing global AI development with insights from Indian diversity and complexity, 
                      contributing to more inclusive AI systems worldwide.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Innovation Leadership</h4>
                    <p className="text-brand-grey-light text-sm leading-relaxed">
                      Pioneering research in multilingual AI, regional commerce intelligence, and 
                      culturally-sensitive machine learning applications.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Section - Simple Responsive */}
      <section id="research" className="section-spacing px-4 border-t border-brand-grey-dark">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 gradient-text">Research Focus</h2>
            <p className="text-lg text-brand-grey-light max-w-3xl mx-auto leading-relaxed">
              Our research spans cutting-edge AI technologies with special emphasis on Indian contexts and multilingual capabilities.
            </p>
          </div>
          
          <div className="space-y-12">
            <div>
              <div className="border border-brand-grey-dark rounded-lg p-8 md:p-12">
                <h3 className="text-2xl md:text-3xl font-bold mb-6 text-white">Hindi Language Models</h3>
                <p className="text-lg text-brand-grey-light leading-relaxed mb-8">
                  Developing state-of-the-art language models specifically optimized for Hindi and related 
                  Indian languages, addressing unique linguistic challenges and cultural contexts.
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Linguistic Accuracy</h4>
                    <p className="text-brand-grey-light text-sm leading-relaxed">
                      Advanced models that understand grammar, context, and cultural nuances specific to Hindi and regional dialects.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Code-Switching</h4>
                    <p className="text-brand-grey-light text-sm leading-relaxed">
                      Intelligent handling of mixed-language communication patterns common in Indian contexts.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Cultural Context</h4>
                    <p className="text-brand-grey-light text-sm leading-relaxed">
                      Models trained to understand cultural references, traditions, and context-specific communication styles.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="border border-brand-grey-dark rounded-lg p-8 md:p-12">
                <h3 className="text-2xl md:text-3xl font-bold mb-6 text-white">Regional Commerce AI</h3>
                <p className="text-lg text-brand-grey-light leading-relaxed mb-8">
                  Specialized AI systems designed to understand and optimize regional commerce patterns, 
                  local market dynamics, and culturally-specific business practices across India.
                </p>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Market Intelligence</h4>
                    <p className="text-brand-grey-light text-sm leading-relaxed">
                      AI-powered insights into regional preferences, seasonal patterns, and local market behavior 
                      to help businesses make informed decisions.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Cultural Commerce</h4>
                    <p className="text-brand-grey-light text-sm leading-relaxed">
                      Understanding festival seasons, regional celebrations, and cultural events that drive 
                      commerce patterns across different states and communities.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section - Simple Responsive */}
      <section id="projects" className="section-spacing px-4 border-t border-brand-grey-dark">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 gradient-text">Featured Projects</h2>
            <p className="text-lg text-brand-grey-light max-w-3xl mx-auto leading-relaxed">
              Showcase of our key projects that demonstrate our commitment to advancing AI technology for Indian contexts.
            </p>
          </div>
          
          <div className="space-y-12">
            <div>
              <div className="border border-brand-grey-dark rounded-lg p-8 md:p-12">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-0">Indic-NLP</h3>
                  <span className="text-sm text-brand-grey-light bg-brand-grey-dark px-3 py-1 rounded-full">Open Source</span>
                </div>
                <p className="text-lg text-brand-grey-light leading-relaxed mb-6">
                  A comprehensive natural language processing toolkit specifically designed for Indian languages, 
                  providing developers and researchers with powerful tools for text processing, analysis, and understanding.
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Multi-Script Support</h4>
                    <p className="text-brand-grey-light text-sm leading-relaxed">
                      Comprehensive support for Devanagari, Tamil, Telugu, Bengali, and other Indian scripts with advanced preprocessing capabilities.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Language Detection</h4>
                    <p className="text-brand-grey-light text-sm leading-relaxed">
                      Accurate identification of Indian languages and dialects, including handling of mixed-language content.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Research Tools</h4>
                    <p className="text-brand-grey-light text-sm leading-relaxed">
                      Complete suite of research tools for linguistic analysis, corpus development, and evaluation metrics.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="border border-brand-grey-dark rounded-lg p-8 md:p-12">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-0">Regional Vision</h3>
                  <span className="text-sm text-brand-grey-light bg-brand-grey-dark px-3 py-1 rounded-full">Open Source</span>
                </div>
                <p className="text-lg text-brand-grey-light leading-relaxed mb-6">
                  Computer vision models trained specifically for Indian contexts, understanding cultural symbols, 
                  regional architecture, traditional clothing, and other India-specific visual elements.
                </p>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Cultural Recognition</h4>
                    <p className="text-brand-grey-light text-sm leading-relaxed">
                      Advanced recognition of Indian cultural symbols, festivals, traditional attire, and regional 
                      architectural styles with high accuracy and cultural sensitivity.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Regional Adaptation</h4>
                    <p className="text-brand-grey-light text-sm leading-relaxed">
                      Models fine-tuned for different Indian regions, understanding local variations in culture, 
                      clothing, food, and environmental factors.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="border border-brand-grey-dark rounded-lg p-8 md:p-12">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-0">Multilingual Assistant</h3>
                  <span className="text-sm text-brand-grey-light bg-brand-grey-dark px-3 py-1 rounded-full">Open Source</span>
                </div>
                <p className="text-lg text-brand-grey-light leading-relaxed mb-6">
                  An intelligent assistant capable of seamlessly switching between multiple Indian languages, 
                  understanding context, cultural nuances, and providing culturally appropriate responses.
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Code-Switch Handling</h4>
                    <p className="text-brand-grey-light text-sm leading-relaxed">
                      Natural handling of conversations that mix Hindi, English, and regional languages as commonly spoken in India.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Cultural Context</h4>
                    <p className="text-brand-grey-light text-sm leading-relaxed">
                      Understanding of Indian festivals, traditions, and cultural references to provide contextually appropriate responses.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Regional Customization</h4>
                    <p className="text-brand-grey-light text-sm leading-relaxed">
                      Customizable responses based on regional preferences, local customs, and state-specific information needs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Simple Responsive */}
      <section id="contact" className="section-spacing px-4 border-t border-brand-grey-dark">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 gradient-text">Contact Us</h2>
            <p className="text-lg text-brand-grey-light max-w-3xl mx-auto leading-relaxed">
              Connect with us to explore collaboration opportunities, discuss research partnerships, 
              or learn more about our AI solutions for Indian markets.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 mb-16">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Get In Touch</h3>
                <div className="space-y-6">
                  <div className="border border-brand-grey-dark rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-white mb-3">General Inquiries</h4>
                    <p className="text-brand-grey-light mb-2">hello@theaiindian.com</p>
                    <p className="text-brand-grey-light text-sm">
                      For general questions about our company, products, and services.
                    </p>
                  </div>
                  
                  
                  
                  <div className="border border-brand-grey-dark rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-white mb-3">Business Development</h4>
                    <p className="text-brand-grey-light mb-2">business@theaiindian.com</p>
                    <p className="text-brand-grey-light text-sm">
                      Explore integration opportunities and enterprise solutions.
                    </p>
                  </div>
                  
                  <div className="border border-brand-grey-dark rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-white mb-3">Careers</h4>
                    <p className="text-brand-grey-light mb-2">careers@theaiindian.com</p>
                    <p className="text-brand-grey-light text-sm">
                      Join our team of passionate AI researchers and engineers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Office Information & Social */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Our Location</h3>
                <div className="border border-brand-grey-dark rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-white mb-4">Headquarters</h4>
                  <div className="text-brand-grey-light space-y-2">
                    <p>The AI Indian Technologies Pvt. Ltd.</p>
                    <p>Bangalore, Karnataka</p>
                    <p>India</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-brand-grey-dark">
                    <p className="text-brand-grey-light text-sm">
                      We're building the future of AI from the heart of India's tech capital, 
                      bringing together diverse talent and perspectives to create globally relevant solutions.
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Connect With Us</h3>
                <div className="space-y-4">
                  <div className="border border-brand-grey-dark rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-white mb-3">Research Updates</h4>
                    <p className="text-brand-grey-light text-sm mb-3">
                      Stay updated with our latest research publications and project releases.
                    </p>
                    <p className="text-brand-grey-light">publications@theaiindian.com</p>
                  </div>
                  
                  
                </div>
              </div>
            </div>
          </div>
          
          {/* Call to Action */}
          <div className="text-center border-t border-brand-grey-dark pt-12">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4">Ready to Collaborate?</h3>
            <p className="text-brand-grey-light mb-6 max-w-2xl mx-auto">
              Whether you're a researcher, developer, or organization interested in AI for Indian contexts, 
              we'd love to hear from you. Let's build the future of AI together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:hello@theaiindian.com" 
                className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-brand-grey-light transition-colors"
              >
                Start a Conversation
              </a>
              <a 
                href="mailto:research@theaiindian.com" 
                className="border border-brand-grey-dark text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-grey-dark transition-colors"
              >
                Research Partnership
              </a>
            </div>
          </div>
          
          {/* Footer */}
          <div className="border-t border-brand-grey-dark pt-8 mt-12 text-center">
            <p className="text-brand-grey-light text-sm">
              © 2024 The AI Indian Technologies Pvt. Ltd. Building the future of artificial intelligence for India and the world.
            </p>
          </div>
        </div>
      </section>
    </motion.div>
  );
}