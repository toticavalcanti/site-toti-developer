'use client';

import { books } from '@/mockData';
import Container from './Container';
import SectionTitle from './SectionTitle';
import Button from './Button';
import { Book, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BooksSection() {
  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-28 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background -z-10" />
      
      <Container>
        <SectionTitle
          title="Publicações"
          subtitle="Livros publicados sobre IA e Música"
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 mt-8 sm:mt-10 md:mt-12">
          {books.map((book, index) => (
            <motion.article
              key={book.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="group relative"
            >
              <div className="relative rounded-2xl border border-border bg-background-secondary p-6 sm:p-8 hover:border-primary transition-all duration-300 overflow-hidden h-full flex flex-col">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">
                  {/* Book icon badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4 self-start">
                    <Book size={16} />
                    <span>{book.format}</span>
                  </div>

                  {/* Book cover and info grid */}
                  <div className="flex gap-6 mb-6">
                    {/* Book Cover */}
                    <div className="flex-shrink-0">
                      <div className="relative rounded-lg overflow-hidden shadow-xl group-hover:shadow-2xl group-hover:shadow-primary/20 transition-all duration-300">
                        <img
                          src={book.coverImage}
                          alt={`${book.title} cover`}
                          className="w-32 sm:w-40 h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </div>

                    {/* Book Info */}
                    <div className="flex-grow flex flex-col">
                      <h3 className="text-xl sm:text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {book.title}
                      </h3>
                      <p className="text-sm sm:text-base text-foreground-secondary mb-3 italic">
                        {book.subtitle}
                      </p>
                      
                      {/* Language badge */}
                      <div className="inline-flex items-center gap-2 px-2 py-1 rounded-md bg-background text-foreground-secondary text-xs font-medium mb-2 self-start">
                        <span>🌍 {book.language}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-foreground-secondary mb-6 leading-relaxed flex-grow">
                    {book.description}
                  </p>

                  {/* Topics */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {book.topics.map((topic) => (
                      <span
                        key={topic}
                        className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>

                  {/* Amazon Link */}
                  <div className="mt-auto">
                    <Button
                      asChild
                      className="w-full group-hover:shadow-lg group-hover:shadow-primary/30 transition-all"
                    >
                      <a
                        href={book.amazonUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        <span>Ver na Amazon</span>
                        <ExternalLink size={18} />
                      </a>
                    </Button>
                    
                    {book.year && (
                      <p className="text-xs text-foreground-secondary text-center mt-3">
                        Publicado em {book.year}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Additional CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-foreground-secondary text-sm sm:text-base">
            📚 Autor de livros técnicos sobre IA Generativa e História da Música
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
