import Link from 'next/link';
import { Github, Linkedin, Mail } from 'lucide-react';
import { resume } from '@/data';

const socialIcons = {
  Github,
  Linkedin,
  Mail,
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              © {currentYear} {resume.name}. All rights reserved.
            </p>
          </div>
          <div className="flex gap-4">
            {resume.socialLinks.map((social) => {
              const Icon = socialIcons[social.icon as keyof typeof socialIcons];
              return (
                <Link
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <span className="sr-only">{social.name}</span>
                  <Icon className="h-5 w-5" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
