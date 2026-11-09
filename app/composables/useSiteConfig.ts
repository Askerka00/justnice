export const useSiteConfig = () => {
  return useState<any>('siteConfig', () => null)
}
