async function install(pkg, version) {
    const response = await fetch(`https://moduland.ml/pkg/pull/${pkg}`);
    const pkg_data = await response.json();
    const url = pkg_data.url;

    let clone;
    
    if(version) {
        clone = Deno.run({"cmd": ["git", "clone", "--depth", "1", "--branch", version, url, `modules/${pkg}`]});
    } else {
        clone = Deno.run({"cmd": ["git", "clone", "--depth", "1", url, `modules/${pkg}`]});
    }

    await clone.status();
    const postinstall = Deno.run({"cmd": ["bash", "-c", `cd modules/${pkg} && ./postinstall.sh`]});
    await postinstall.status();
}

try {
    Deno.readTextFileSync("packages.json")
} catch {
    Deno.writeTextFileSync("packages.json", JSON.stringify({"packages": {}}));
}
let packages = JSON.parse(Deno.readTextFileSync("packages.json"));

switch(Deno.args[0]) {
    case "install":
        const modules_folder = Deno.run({"cmd": ["mkdir", "modules"]});
        await modules_folder.status();        

        if(Deno.args[1]) {
            install(Deno.args[1], Deno.args[2]);
            packages["packages"][Deno.args[1]] = Deno.args[2] ? Deno.args[2] : "";
            Deno.writeTextFileSync("packages.json", JSON.stringify(packages));
        } else {
            Object.keys(packages.packages).forEach(pkg => {
                install(pkg, packages.packages[pkg]);
            });
        }
        break;
    
    case "remove":
        try {
            Deno.removeSync(`modules/${Deno.args[1]}`, {recursive: true});
        } catch {}

        if(packages["packages"].hasOwnProperty(Deno.args[1])) {
            delete packages["packages"][Deno.args[1]];
            Deno.writeTextFileSync("packages.json", JSON.stringify(packages));
        }
        break;
}