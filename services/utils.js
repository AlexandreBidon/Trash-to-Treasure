let main_theme = new Audio('./musics/Zazie.mp3');
main_theme.loop = true;
main_theme.volume = 0.1;


let first_click = false


function displayScene(scene) {
    if (!first_click) {
        main_theme.play()
        first_click = true;
    }
    let click_audio = new Audio('./sounds/default_click.mp3');
    let StartMenu = document.getElementById("start_menu")
    let ArtCraft = document.getElementById("art_craft")
    let Museum = document.getElementById("museum")
    let TrashLoot = document.getElementById("trash_loot")
    let UpgradeGallery = document.getElementById("upgrade_gallery")
    let HowToPlay = document.getElementById("how_to_play")
    let CraftBook = document.getElementById("craft_book")
    StartMenu.style.display = "none";
    ArtCraft.style.display = "none";
    TrashLoot.style.display = "none";
    Museum.style.display = "none";
    UpgradeGallery.style.display = "none";
    HowToPlay.style.display = "none";
    CraftBook.style.display = "none";
    click_audio.play();
    switch (scene) {
        case 'start_menu':
            StartMenu.style.display = "flex";
            break;
        case 'art_craft':
            ArtCraft.style.display = "flex";
            break;  
        case 'museum':
            Museum.style.display = "flex";
            break;
        case 'trash_loot':
            TrashLoot.style.display = "flex";
            break;
        case 'upgrade_gallery':
            UpgradeGallery.style.display = "flex";
            break;
        case 'how_to_play':
            HowToPlay.style.display = "flex";
            break;
        case 'craft_book':
            CraftBook.style.display = "flex";
        default:
            console.log("scene not found")
    }
}   

