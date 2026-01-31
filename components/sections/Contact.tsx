'use client';

import { resume } from '@/data';
import { Mail, Linkedin, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { motion } from 'framer-motion';

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const contacts = [
    {
      name: 'Email',
      value: resume.email,
      icon: Mail,
      href: `mailto:${resume.email}`,
    },
    {
      name: 'LinkedIn',
      value: 'Connect on LinkedIn',
      icon: Linkedin,
      href: resume.socialLinks.find((s) => s.name === 'LinkedIn')?.url || '#',
    },
    {
      name: 'GitHub',
      value: 'Check out my repositories',
      icon: Github,
      href: resume.socialLinks.find((s) => s.name === 'GitHub')?.url || '#',
    },
  ];

  return (
    <section id="contact" className="scroll-mt-16 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-8 text-center text-3xl font-bold">Get In Touch</h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
            I&apos;m currently looking for new opportunities. Whether you have a question or just
            want to say hi, I&apos;ll try my best to get back to you!
          </p>

          <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-3">
            {contacts.map((contact) => {
              const Icon = contact.icon;
              return (
                <Card key={contact.name} className="transition-shadow hover:shadow-lg">
                  <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                    <Icon className="mb-4 h-8 w-8 text-primary" />
                    <h3 className="mb-2 font-semibold">{contact.name}</h3>
                    <p className="mb-4 text-sm text-muted-foreground">{contact.value}</p>
                    <Button asChild variant="outline" size="sm">
                      <a href={contact.href} target="_blank" rel="noopener noreferrer">
                        Contact
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
