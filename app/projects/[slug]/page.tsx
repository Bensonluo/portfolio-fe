import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { notFound } from 'next/navigation';
import { getProjectBySlug, projects } from '@/data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Github, ExternalLink, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { QLoRADemo } from '@/components/projects/QLoRADemo';
import { ChatInterface } from '@/components/projects/ChatInterface';
import { RAGPipelineOverview } from '@/components/projects/RAGPipelineOverview';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} - Portfolio`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Button asChild variant="ghost" className="mb-8">
            <Link href="/projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
          </Button>

          <div className="mb-8">
            <div className="mb-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="mb-4 text-4xl font-bold">{project.title}</h1>
            <p className="mb-6 text-xl text-muted-foreground">{project.description}</p>

            <div className="flex flex-wrap gap-4">
              {project.githubUrl && (
                <Button asChild variant="outline">
                  <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    View Source
                  </Link>
                </Button>
              )}
              {project.liveUrl && (
                <Button asChild variant="outline">
                  <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Demo
                  </Link>
                </Button>
              )}
            </div>
          </div>

          <div className="prose prose-neutral dark:prose-invert mb-12 max-w-none">
            <p className="text-lg leading-relaxed text-muted-foreground">
              {project.longDescription}
            </p>
          </div>

          {/* Tech Stack */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Tech Stack</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Interactive Demo - Most important, show first */}
          {project.demoType === 'visualization' && project.slug === '4bit-qlora-post-training' && (
            <QLoRADemo stats={project.stats} />
          )}

          {project.demoType === 'interactive' && project.slug === 'rag-chatbot' && (
            <div className="mb-12">
              <ChatInterface />
            </div>
          )}

          {/* RAG Technical Overview */}
          {project.slug === 'rag-chatbot' && (
            <div className="mb-12">
              <RAGPipelineOverview stats={project.stats} />
            </div>
          )}

          {/* Additional Stats/Info */}
          {project.capabilities && (
            <Card className="mb-12">
              <CardHeader>
                <CardTitle>Key Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {project.capabilities.map((capability) => (
                    <li key={capability} className="flex items-start">
                      <span className="mr-2 text-primary">✓</span>
                      <span className="text-muted-foreground">{capability}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
