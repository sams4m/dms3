import Prism from "https://esm.sh/prismjs";
import { render } from "https://esm.sh/jsr/@deno/gfm/mod.ts";

export default function codeblockRenderer(document, script_id, el_id) {
  const script = document.getElementById(script_id);
  const el = document.getElementById(el_id);
  const div = document.createElement(`div`);
  // Add styling for height and overflow
  div.style.height = "400px";
  div.style.overflow = "auto";

  div.innerHTML = render("```js\n" + script.innerText + "\n```");

  el.after(div);
}
