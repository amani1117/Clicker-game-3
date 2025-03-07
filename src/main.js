import kaplay from "kaplay";

// Initialize Kaplay
const k = kaplay();

// Load assets
k.loadSprite("grass", "pixgrass.jpg");
k.loadSprite("playbut","UI Big Play Button.png",{
  sliceX:2,
  sliceY:2,
});
k.loadSprite("button", "Square Buttons 26x26.png", {
  sliceX: 2,
  sliceY: 4,
  anims: {
    click: { from: 0, to: 1, loop: true, speed: 30 },
  },
});
k.loadSprite("ch", "Basic Charakter Spritesheet.png", {
  sliceX: 4,
  sliceY: 4,
  anims: {
    stand: { from: 0, to: 1, loop: true, speed: 5 },
  },
});
k.loadSprite("chaxe", "Basic Charakter Actions.png", {
  sliceX: 2,
  sliceY: 12,
  anims: {
    stand1: { from: 16, to: 16 },
    water: { from: 18, to: 19, loop: true, speed: 10 },
  },
});
k.loadSprite("plant", "Basic_Plants.png", {
  sliceX: 6,
  sliceY: 2,
});
k.loadSprite("yaych", "Emoji_Spritesheet_Free.png", {
  sliceX: 5,
  sliceY: 19,
  anims: {
    yay: { from: 25, to: 26, loop: true, speed: 5 },

  },
});
k.loadSprite("bed", "Basic_Furniture.png", {
  sliceX: 9,
  sliceY: 6,
});
k.loadFont("p", "pixelFont-7-8x14-sproutLands.ttf");

// Main Menu Scene
k.scene("mainMenu", () => {
  // Add background
  k.add([
    k.sprite("grass"),
    k.pos(0, 0),
    k.scale(k.width() / 473, k.height() / 215),
    k.fixed(),
  ]);

  // Add title
  k.add([
    k.text("Crop Growing Clicker Game :3", { font: "p", size: 50 }),
    k.pos(k.center().x - 150, k.center().y - 100),
    k.fixed(),
  ]);

  // Add start button
  const startButton = k.add([
    k.sprite("playbut",{frame:2}),
    k.pos(k.center().x - 50, k.center().y + 50),
    k.scale(4),
    k.area(),
    "startButton",
  ]);

  // On click event for start button
  startButton.onClick(() => {
    k.go("game"); // Transition to the game scene
  });
});

// Game Scene
k.scene("game", () => {
  // Game variables
  let clicks = 0;
  let clickMultiplier = 1;
  let passiveIncome = 0;
  let count = 0;
  let chup = null;
  let yaych = null;
  let newbed = null;
  let cost5Purchased = false;
  let cost30Purchased = false;
  let cost100Purchased = false;
  let cost200Purchased = false;
  let cost400Purchased = false;
  let cost500Purchased = false;
  let plant = null;
  let cost5UpgradeText = null;
  let cost30UpgradeText = null;
  let cost100UpgradeText = null;
  let cost200UpgradeText = null;
  let cost400UpgradeText = null;
  let cost500UpgradeText = null;

  // Display click counter
  k.add([
    k.sprite("grass"),
    k.pos(0, 0),
    k.scale(k.width() / 473, k.height() / 215),
    k.fixed(),
  ]);
  const clickText = k.add([
    k.text("Clicks: 0", { font: "p", size: 30 }),
    k.pos(20, 20),
    k.scale(2),
    k.fixed(),
  ]);

  // Clickable sprite
  const b = k.add([
    k.sprite("button"),
    k.pos(k.center().x - 160, k.center().y - 50),
    k.area(),
    k.scale(4),
    "clickable",
  ]);

  // Character sprite
  const ch = k.add([
    k.sprite("ch"),
    k.pos(k.center().x + 100, k.center().y - 200),
    k.scale(10),
  ]);

  // Play the standing animation
  ch.play("stand");

  // On click event for the button
  b.onClick(() => {
    clicks += clickMultiplier;
    clickText.text = `Clicks: ${formatNumber(clicks)}`;
    b.scale = k.vec2(4.2);
    b.play("click");
    k.wait(0.1, () => {
      b.scale = k.vec2(4);
      b.stop();
      b.frame = 0;
    });
  });

  // Unlockable upgrades
  const upgrades = [
    {
      name: "New Upgrade!",
      cost: 10,
      action: () => {
        clickMultiplier += 1;
        chup = k.add([
          k.sprite("chaxe"),
          k.pos(k.center().x, k.center().y - 200),
          k.scale(10),
          k.area(),
          "upgradedCharacter",
        ]);
        k.destroy(ch);
        plant = k.add([
          k.sprite("plant", { frame: 0 }),
          k.pos(k.center().x + 120, k.center().y - 220),
          k.scale(10),
        ]);
        cost5Purchased = true;
        if (cost5UpgradeText) {
          k.destroy(cost5UpgradeText);
        }
      },
    },
    {
      name: "Plant upgrade 2",
      cost: 300,
      action: () => {
        clickMultiplier += 10;
        if (plant) {
          k.destroy(plant);
        }
        plant = k.add([
          k.sprite("plant", { frame: 1 }),
          k.pos(k.center().x + 120, k.center().y - 220),
          k.scale(10),
        ]);
        cost30Purchased = true;
        if (cost30UpgradeText) {
          k.destroy(cost30UpgradeText);
        }
      },
    },
    {
      name: "Plant upgrade 3",
      cost: 1000,
      action: () => {
        clickMultiplier += 10;
        if (plant) {
          k.destroy(plant);
        }
        plant = k.add([
          k.sprite("plant", { frame: 2 }),
          k.pos(k.center().x + 120, k.center().y - 220),
          k.scale(10),
        ]);
        cost100Purchased = true;
        if (cost100UpgradeText) {
          k.destroy(cost100UpgradeText);
        }
      },
    },
    {
      name: "Plant upgrade 4",
      cost: 2000,
      action: () => {
        clickMultiplier += 10;
        if (plant) {
          k.destroy(plant);
        }
        plant = k.add([
          k.sprite("plant", { frame: 3 }),
          k.pos(k.center().x + 120, k.center().y - 220),
          k.scale(10),
        ]);
        cost200Purchased = true;
        if (cost200UpgradeText) {
          k.destroy(cost200UpgradeText);
        }
      },
    },
    {
      name: "Plant upgrade 5",
      cost: 4000,
      action: () => {
        clickMultiplier += 10;
        if (plant) {
          k.destroy(plant);
        }
        plant = k.add([
          k.sprite("plant", { frame: 4 }),
          k.pos(k.center().x + 120, k.center().y - 220),
          k.scale(10),
        ]);
        cost400Purchased = true;
        if (cost400UpgradeText) {
          k.destroy(cost400UpgradeText);
        }
      },
    },
    {
      name: "Final Product and a special surprise!!",
      cost: 50000,
      action: () => {
        clickMultiplier += 60;
        if (plant) {
          k.destroy(plant);
        }
        plant = k.add([
          k.sprite("plant", { frame: 5 }),
          k.pos(k.center().x + 120, k.center().y - 220),
          k.scale(10),
        ]);
        cost500Purchased = true;
        if (cost500UpgradeText) {
          k.destroy(cost500UpgradeText);
        }
        yaych = k.add([
          k.sprite("yaych", { frame: 25 }),
          k.pos(k.center().x + 200, k.center().y - 90),
          k.scale(5),
          k.area(),
          "upgradedCharacter1",
        ]);
        yaych.play("yay");
        yaych.frame = 25;
        k.destroy(chup);
        const finaltext = k.add([
          k.text("WELL DONEE\nGo to sleep", { font: "p", size: 80 }),
          k.pos(k.center().x - 300, k.center().y),
          k.fixed(),
        ]);
        k.destroy(b);
        newbed = k.add([
          k.sprite("bed", { frame: 19 }),
          k.pos(k.center().x + 400, k.center().y + 60),
          k.rotate(90),
          k.scale(15),
          k.area(),
        ]);
        k.wait(4,()=>{
          k.go("Mainmenu");
        })
      },
    },
  ];

  // Display upgrades
  upgrades.forEach((upgrade, index) => {
    const y = 90 + index * 40;
    const upgradeText = k.add([
      k.text(`${upgrade.name} - Cost: ${formatNumber(upgrade.cost)}`, { font: "p", size: 25 }),
      k.pos(20, y),
      k.fixed(),
    ]);

    // Track the cost 5 upgrade text
    if (upgrade.cost === 10) {
      cost5UpgradeText = upgradeText;
    }
    if (upgrade.cost === 300) {
      cost30UpgradeText = upgradeText;
    }
    if (upgrade.cost === 1000) {
      cost100UpgradeText = upgradeText;
    }
    if (upgrade.cost === 2000) {
      cost200UpgradeText = upgradeText;
    }
    if (upgrade.cost === 4000) {
      cost400UpgradeText = upgradeText;
    }
    if (upgrade.cost === 50000) {
      cost500UpgradeText = upgradeText;
    }

    // Buy upgrade
    b.onClick(() => {
      if (clicks >= upgrade.cost) {
        if (upgrade.cost === 10 && cost5Purchased) {
          waterplay();
          return;
        }
        if (upgrade.cost === 300 && cost30Purchased) {
          waterplay();
          return;
        }
        if (upgrade.cost === 1000 && cost100Purchased) {
          waterplay();
          return;
        }
        if (upgrade.cost === 2000 && cost200Purchased) {
          waterplay();
          return;
        }
        if (upgrade.cost === 4000 && cost400Purchased) {
          waterplay();
          return;
        }
        if (upgrade.cost === 50000 && cost500Purchased) {
          return;
        }
        clicks -= upgrade.cost;
        upgrade.action();
        clickText.text = `Clicks: ${formatNumber(clicks)}`;
        if (chup) {
          console.log("Upgraded character clicked!");
          chup.play("water");
          k.wait(0.1, () => {
            chup.stop();
          });
        }
      }
    });
  });

  function waterplay() {
    chup.play("water");
    k.wait(0.1, () => {
      chup.stop();
    });
  }

  // Passive income loop
  k.loop(1, () => {
    clicks += passiveIncome;
    clickText.text = `Clicks: ${formatNumber(clicks)}`;
  });

  // Format large numbers
  function formatNumber(num) {
    if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`;
    return num.toString();
  }
});

// Start with the main menu scene
k.go("mainMenu");