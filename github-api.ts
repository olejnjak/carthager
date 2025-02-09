import { Octokit, RestEndpointMethodTypes } from "@octokit/rest";
import { release } from "os";

const octokit = new Octokit();

interface ReleaseData {
  tag_name: string;
  assets: {
    name: string;
    download_url: string;
  }[];
}

async function fetchAllReleases(owner: string, repo: string): Promise<ReleaseData[]> {
  var allReleases: ReleaseData[] = [];
  let page = 1;

  while (true) {
    const response = await octokit.rest.repos.listReleases({
      owner,
      repo,
      per_page: 100,
      page,
    });

    if (response.data.length === 0) break;

    const releases = response.data.map(release => ({
      tag_name: release.tag_name,
      assets: release.assets.map(asset => ({
        name: asset.name,
        download_url: asset.browser_download_url,
      })),
    }));

    allReleases.push(...releases);

    page++;
  }

  return allReleases;
}

export async function getReleaseAssets(owner: string, repo: string): Promise<{ [key: string]: string }> {
  try {
    const response = await fetchAllReleases(owner, repo);
    const releaseAssetsMap: { [key: string]: string } = {};

    response.forEach(release => {
      const releaseTag = release.tag_name.replace(/[^0-9.]/g, "");
      const xcframeworkAsset = release.assets.find(asset => asset.name.endsWith(".xcframework.zip"));
      
      if (xcframeworkAsset) {
        releaseAssetsMap[releaseTag] = xcframeworkAsset.download_url;
      }
    });

    console.log(releaseAssetsMap);
    return releaseAssetsMap;
  } catch (error) {
    console.error("Error fetching release assets:", error);
    return {};
  }
}