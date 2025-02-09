import { Octokit } from "@octokit/rest";

const octokit = new Octokit();

export async function getReleaseAssets(owner: string, repo: string): Promise<{ [key: string]: string }> {
  try {
    const response = await octokit.rest.repos.listReleases({ owner, repo });
    const releaseAssetsMap: { [key: string]: string } = {};

    response.data.forEach(release => {
      const releaseTag = release.tag_name.replace(/[^0-9.]/g, "");
      const xcframeworkAsset = release.assets.find(asset => asset.name.endsWith(".xcframework.zip"));
      
      if (xcframeworkAsset) {
        releaseAssetsMap[releaseTag] = xcframeworkAsset.browser_download_url;
      }
    });

    console.log(releaseAssetsMap);
    return releaseAssetsMap;
  } catch (error) {
    console.error("Error fetching release assets:", error);
    return {};
  }
}