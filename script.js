async function analyze() {
  const agent = document.getElementById("agent").value;
  const enemies = document.getElementById("enemies").value;
  const map = document.getElementById("map").value;
  const round = document.getElementById("round").value;

  const modeToggle = document.getElementById("modeToggle");
  const mode = modeToggle.checked ? "pro" : "quick";

  const output = document.getElementById("result");

  if (!agent || !map || !round) {
    output.innerHTML = "⚠ Please complete all required fields.";
    return;
  }

  output.innerHTML = "🧠 Analyzing round...";

  try {
    const res = await fetch("https://valorant-ai-backend-oo4o-hmbarzoxn-vint10s-projects.vercel.app/api/coach", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        agent,
        enemies,
        map,
        round,
        mode,
      }),
    });

    const data = await res.json();

    if (!data.advice) {
      output.innerHTML = "⚠ No advice received.";
      return;
    }

    const bullets = data.advice
      .split("\n")
      .filter(line => line.trim() !== "");

    output.innerHTML = "";

    bullets.forEach(line => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerText = line.replace(/^[-•]\s*/, "");
      output.appendChild(card);
    });

  } catch (err) {
    output.innerHTML = "❌ Server error.";
    console.error(err);
  }
}
