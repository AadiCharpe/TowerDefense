import kaboom from "https://unpkg.com/kaboom@3000.0.1/dist/kaboom.mjs";

kaboom();

scene("title", ()=>{
    add([
        rect(width(), height()),
        color(74, 78, 186)
    ])
    add([
        text("Tower Defense"),
        anchor("center"),
        scale(2),
        pos(width() / 2, 80)
    ])
    add([
        text("Press Space to Start"),
        anchor("center"),
        scale(2),
        pos(width() / 2, 160)
    ])

    onKeyPress("space", ()=>{go("game")})
})

scene("game", ()=>{
    add([
        rect(width() * .3, height()),
        pos(width() * .7, 0),
        color(110, 110, 110)
    ])
    const tileMap = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 2, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 2, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 2, 0, 0, 0, 3, 0, 0, 0, 1, 1, 1, 3, 0],
        [1, 1, 1, 2, 0, 0, 0, 3, 0, 0, 0, 2, 0, 0, 3, 0],
        [0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 2, 0, 0, 3, 0],
        [0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 2, 0, 0, 3, 0],
        [0, 0, 0, 3, 4, 4, 4, 4, 0, 0, 0, 2, 0, 0, 3, 0],
        [0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 3, 0],
        [0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 3, 0],
        [0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 3, 0],
        [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 3, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0]
    ];
    let tileWidth = 50;//(width() * .7) / 16;
    let tileHeight = 40;//height() / 16;
    let enemyX = 0;
    let enemyY = 7;
    let direction = 1;
    let health = 100;

    for(let i = 0; i < tileMap.length; i++) {
        for(let j = 0; j < tileMap[i].length; j++) {
            if(tileMap[i][j] == 0) {
                add([
                    rect(tileWidth, tileHeight),
                    anchor("center"),
                    pos(j * tileWidth + tileWidth / 2, i * tileHeight + tileHeight / 2),
                    color(42, 247, 62),
                    area(),
                    "green"
                ])
            } else {
                add([
                    rect(tileWidth, tileHeight),
                    pos(j * tileWidth + tileWidth / 2, i * tileHeight + tileHeight / 2),
                    anchor("center"),
                    color(181, 137, 32),
                    area(),
                    "path"
                ])
            }
        }
    }

    const circ = add([
        anchor("center"),
        circle(14),
        pos(5, enemyY * tileHeight + tileHeight / 2),
        area(),
        "enemy"
    ]);

    const base = add([
        rect(tileWidth * 3, tileHeight),
        pos(784, 612),
        color(150, 127, 67), 
        area()
    ]);
    
    const tower = add([
        rect(tileWidth, tileHeight * 2),
        pos(tileWidth * 5, tileHeight * 6),
        color(90, 90, 90)
    ])

    base.onCollide("enemy", () => {
        go("title");
    });

    /*loop(.07, () => {
        if (tileMap[enemyY][enemyX] == 1) {
            enemyX++;
        } else if (tileMap[enemyY][enemyX] == 2) {
            enemyY--;
        } else if (tileMap[enemyY][enemyX] == 3) {
            enemyY++;
        } else if (tileMap[enemyY][enemyX] == 4) {
            enemyX--;
        }
        circ.pos.x = (enemyX * tileWidth) + 30;
        circ.pos.y = (enemyY * tileHeight) + 20;
    })*/

    onUpdate(() => {
        if(health <= 0)
            circ.destroy()
    });

    circ.onCollideUpdate("path", (tile)=>{
        console.log(circ.pos)
        debug.log(tileMap[enemyY][enemyX])
        if(circ.pos.x === tile.pos.x && circ.pos.y === tile.pos.y  ){
            if (tileMap[enemyY][enemyX] == 1) {
                enemyX++;
            } else if (tileMap[enemyY][enemyX] == 2) {
                enemyY--;
            } else if (tileMap[enemyY][enemyX] == 3) {
                enemyY++;
            } else if (tileMap[enemyY][enemyX] == 4) {
                enemyX--;
            }
            direction = tileMap[enemyY][enemyX] 
            if (direction === 1) {
                circ.pos.x += tileWidth/10;
            } else if (direction === 2) {
                circ.pos.y -= tileHeight/10;
            } else if (direction === 3) {
                circ.pos.y += tileHeight/-10;
            } else if (direction === 4) {
                circpos.x += tileWidth/-10;
            }
        }
        else{
            if (direction === 1) {
                circ.pos.x += tileWidth/10;
            } else if (direction === 2) {
                circ.pos.y -= tileHeight/10;
            } else if (direction === 3) {
                circ.pos.y += tileHeight/-10;
            } else if (direction === 4) {
                circpos.x += tileWidth/-10;
            }
        }
    })
});

go("title")