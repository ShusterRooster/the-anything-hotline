export type Article = {
    id: string,
    documentId: string,
    title: string,
    description: string,
    slug: string,
    createdAt: string,
    updatedAt: string,
    publishedAt: string,
    blocks: [object]
}