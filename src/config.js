exports.dirMap = {
    s: "src",
    c: "common",
    u: "util",
    p: "page",
    sr: "service",
}

exports.getPathByDirlist = (list = []) => {
    let path = "";

    for (const dir of list) {
        path += `${dir}/`
    }

    return path;
}