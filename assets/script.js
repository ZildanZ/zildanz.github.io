const CHANNEL_HANDLE = "zildansecurity";

async function loadYoutubeData() {
  const subEl = document.getElementById("subscriberCount");
  const subSrc = document.getElementById("subscriberSource");
  const titleEl = document.getElementById("latestVideoTitle");
  const thumbEl = document.getElementById("latestVideoThumb");
  const linkEl = document.getElementById("latestVideoLink");

  try {
    const subRes = await fetch(`https://decapi.me/youtube/subs/${CHANNEL_HANDLE}`);
    if (!subRes.ok) throw new Error("sub fetch failed");
    const subs = (await subRes.text()).trim();
    subEl.textContent = subs;
    subSrc.textContent = "Sumber: decapi.me + @zildansecurity";
  } catch (_) {
    subEl.textContent = "Lihat di channel YouTube";
    subSrc.textContent = "Sumber langsung: @zildansecurity";
  }

  try {
    const idRes = await fetch(`https://decapi.me/youtube/latest_video_id/${CHANNEL_HANDLE}`);
    if (!idRes.ok) throw new Error("id fetch failed");
    const videoId = (await idRes.text()).trim();

    if (!videoId || videoId.length < 11) throw new Error("invalid video id");

    linkEl.href = `https://www.youtube.com/watch?v=${videoId}`;
    thumbEl.src = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

    const titleRes = await fetch(`https://decapi.me/youtube/latest_video/${CHANNEL_HANDLE}`);
    if (titleRes.ok) {
      const title = (await titleRes.text()).trim();
      titleEl.textContent = title || "Video terbaru tersedia, klik thumbnail untuk buka.";
    } else {
      titleEl.textContent = "Video terbaru tersedia, klik thumbnail untuk buka.";
    }
  } catch (_) {
    linkEl.href = "https://www.youtube.com/@zildansecurity/videos";
    thumbEl.src = "https://i.ytimg.com/vi/aqz-KE-bpKQ/hqdefault.jpg";
    titleEl.textContent = "Tidak bisa ambil video otomatis sekarang. Klik thumbnail untuk buka daftar video channel.";
  }
}

loadYoutubeData();
