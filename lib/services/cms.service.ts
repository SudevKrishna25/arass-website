/**
 * ARASS — Website CMS & Content Service
 */

import { db } from '../events-db/engine';
import { Page, PageSection, NavigationItem, MediaAsset, SectionType, SectionVisibility, Event } from '../events-db/types';
import { AuditService } from './audit.service';

export interface CreateSectionDTO {
  pageId: string;
  type: SectionType;
  eyebrow?: string;
  title: string;
  body?: string;
  imageUrl?: string;
  videoUrl?: string;
  ctaText?: string;
  ctaUrl?: string;
  visibility?: SectionVisibility;
  metadata?: Record<string, any>;
}

export class CmsService {
  // Pages
  static getAllPages(): Page[] {
    return Array.from(db.pages.values());
  }

  static getPageBySlug(slug: string): Page | null {
    return Array.from(db.pages.values()).find((p) => p.slug === slug) || null;
  }

  static createPage(title: string, slug: string, description: string, actorUserId?: string): Page {
    const pageId = `page-${db.generateId()}`;
    const now = db.now();
    const page: Page = {
      id: pageId,
      slug: slug.toLowerCase(),
      title,
      description,
      status: 'DRAFT',
      createdAt: now,
      updatedAt: now,
    };
    db.pages.set(pageId, page);
    AuditService.log('CONTENT_CREATED', 'PAGE', pageId, actorUserId, { title, slug });
    return page;
  }

  static updatePage(id: string, updates: Partial<Page>, actorUserId?: string): Page {
    const page = db.pages.get(id);
    if (!page) throw new Error('Page not found.');

    Object.assign(page, updates, { updatedAt: db.now() });
    AuditService.log('CONTENT_UPDATED', 'PAGE', id, actorUserId, updates);
    return page;
  }

  // Sections
  static getSections(pageId: string, onlyVisible = false): PageSection[] {
    const sections = Array.from(db.pageSections.values())
      .filter((s) => s.pageId === pageId)
      .sort((a, b) => a.order - b.order);

    if (onlyVisible) {
      return sections.filter((s) => s.visibility === 'VISIBLE');
    }
    return sections;
  }

  static createSection(dto: CreateSectionDTO, actorUserId?: string): PageSection {
    const sectionId = `sec-${db.generateId()}`;
    const existing = this.getSections(dto.pageId);
    const order = existing.length + 1;
    const now = db.now();

    const section: PageSection = {
      id: sectionId,
      pageId: dto.pageId,
      type: dto.type,
      eyebrow: dto.eyebrow,
      title: dto.title,
      body: dto.body,
      imageUrl: dto.imageUrl,
      videoUrl: dto.videoUrl,
      ctaText: dto.ctaText,
      ctaUrl: dto.ctaUrl,
      visibility: dto.visibility || 'VISIBLE',
      order,
      metadata: dto.metadata,
      updatedAt: now,
    };

    db.pageSections.set(sectionId, section);
    AuditService.log('CONTENT_CREATED', 'SECTION', sectionId, actorUserId, { pageId: dto.pageId, title: dto.title });
    return section;
  }

  static updateSection(id: string, updates: Partial<PageSection>, actorUserId?: string): PageSection {
    const section = db.pageSections.get(id);
    if (!section) throw new Error('Section not found.');

    Object.assign(section, updates, { updatedAt: db.now() });
    AuditService.log('CONTENT_UPDATED', 'SECTION', id, actorUserId, updates);
    return section;
  }

  static reorderSections(pageId: string, sectionIds: string[], actorUserId?: string): PageSection[] {
    sectionIds.forEach((id, idx) => {
      const section = db.pageSections.get(id);
      if (section && section.pageId === pageId) {
        section.order = idx + 1;
        section.updatedAt = db.now();
      }
    });

    AuditService.log('CONTENT_UPDATED', 'PAGE_SECTIONS_REORDER', pageId, actorUserId, { count: sectionIds.length });
    return this.getSections(pageId);
  }

  static deleteSection(id: string, actorUserId?: string): boolean {
    const section = db.pageSections.get(id);
    if (!section) return false;

    db.pageSections.delete(id);
    AuditService.log('CONTENT_DELETED', 'SECTION', id, actorUserId, { title: section.title });
    return true;
  }

  // Navigation
  static getNavigation(onlyVisible = false): NavigationItem[] {
    const items = Array.from(db.navigationItems.values()).sort((a, b) => a.order - b.order);
    if (onlyVisible) {
      return items.filter((i) => i.visibility === 'VISIBLE');
    }
    return items;
  }

  static updateNavigation(items: Partial<NavigationItem>[], actorUserId?: string): NavigationItem[] {
    items.forEach((item, idx) => {
      if (!item.id) return;
      const existing = db.navigationItems.get(item.id);
      if (existing) {
        Object.assign(existing, item, { order: idx + 1 });
      }
    });

    AuditService.log('NAVIGATION_UPDATED', 'NAVIGATION', 'global', actorUserId, { count: items.length });
    return this.getNavigation();
  }

  // Media
  static getMediaAssets(): MediaAsset[] {
    return Array.from(db.mediaAssets.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  static registerMediaAsset(asset: Omit<MediaAsset, 'id' | 'createdAt'>): MediaAsset {
    const id = `med-${db.generateId()}`;
    const now = db.now();
    const media: MediaAsset = {
      ...asset,
      id,
      createdAt: now,
    };
    db.mediaAssets.set(id, media);
    AuditService.log('MEDIA_UPLOADED', 'MEDIA', id, asset.uploadedBy, { filename: asset.filename });
    return media;
  }

  static deleteMediaAsset(id: string, actorUserId?: string): boolean {
    const asset = db.mediaAssets.get(id);
    if (!asset) return false;

    db.mediaAssets.delete(id);
    AuditService.log('MEDIA_DELETED', 'MEDIA', id, actorUserId, { filename: asset.filename });
    return true;
  }

  // Featured Public Events for Homepage
  static getFeaturedEvents(): Event[] {
    return Array.from(db.events.values())
      .filter((e) => e.status !== 'DRAFT' && e.status !== 'ARCHIVED')
      .slice(0, 3);
  }
}
