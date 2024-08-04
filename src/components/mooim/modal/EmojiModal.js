import React, { useState } from 'react'

const EmojiModal = ({ inputEmoji }) => {

    const [emojiState, setEmojiState] = useState({
        all: true,
        faces: false,
        nature: false,
        food: false,
        activities: false,
        travel: false,
        objects: false,
        symbols: false,
    });

    const changeEmoji = (category) => {
        setEmojiState({
            all: false,
            faces: false,
            nature: false,
            food: false,
            activities: false,
            travel: false,
            objects: false,
            symbols: false,
            [category]: true,
        });
    };

    const faces = [
        "😁", "😂", "😃", "😄", "😅",
        "😆", "😇", "😈", "😉", "😊",
        "😋", "😌", "😍", "😎", "😏",
        "😐", "😒", "😓", "😔", "😖",
        "😘", "😚", "😜", "😝", "😞",
        "😠", "😡", "😢", "😣", "😤",
        "😥", "😨", "😩", "😪", "😫",
        "😭", "😰", "😱", "😲", "😳",
        "😵", "😶", "😷", "😸", "😹",
        "😺", "😻", "😼", "😽", "😾",
        "😿", "🙀", "🙅", "🙆", "🙇",
        "🙈", "🙉", "🙊", "🙋", "🙌",
        "🙍", "🙎", "🙏", "👶", "👦", 
        "👧", "👨", "👩", "👴", "👵",
        "👮", "👷", "💂", "🕵", "👩‍⚕️", 
        "👨‍⚕️", "👩‍🌾", "👨‍🌾", "👩‍🍳", "👨‍🍳", 
        "👩‍🎓", "👨‍🎓", "👩‍🎤", "👨‍🎤", "👩‍🏫", 
        "👨‍🏫", "👩‍🏭", "👨‍🏭", "👩‍💻", "👨‍💻", 
        "👩‍💼", "👨‍💼", "👩‍🔧", "👨‍🔧", "👩‍🔬", 
        "👨‍🔬", "👩‍🎨", "👨‍🎨", "👩‍🚒", "👨‍🚒", 
        "👩‍✈️", "👨‍✈️", "👩‍🚀", "👨‍🚀", "👩‍⚖️", 
        "👨‍⚖️", "🤴", "👸", "👳‍♀️", "👳‍♂️", 
        "👲", "🧕", "🤵", "👰", "🤰", 
        "🤱", "👩‍🍼", "👨‍🍼", "👫", "👬", 
        "👭", "💏", "💑"
    ];
    const nature = [
        "🐶", "🐱", "🐭", "🐹", "🐰",
        "🦊", "🐻", "🐼", "🐨", "🐯",
        "🦁", "🐮", "🐷", "🐽", "🐸",
        "🐵", "🙈", "🙉", "🙊", "🐒",
        "🐔", "🐧", "🐦", "🐤", "🐣",
        "🐥", "🦆", "🦅", "🦉", "🦇",
        "🐺", "🐗", "🐴", "🦄", "🐝",
        "🐛", "🦋", "🐌", "🐞", "🐜",
        "🕷", "🕸", "🐢", "🐍", "🦎",
        "🦂", "🦞", "🦀", "🐙", "🦑",
        "🐡", "🐠", "🐟", "🐬", "🐳",
        "🐋", "🦈", "🐊", "🐅", "🐆",
        "🦓", "🦍", "🦧", "🐘", "🦛",
        "🦏", "🐪", "🐫", "🦙", "🦒",
        "🐃", "🐂", "🐄", "🐎", "🐖",
        "🐏", "🐑", "🐐", "🦌", "🐕",
        "🐩", "🐈", "🐓", "🦃", "🕊",
        "🍀", "🌷", "🌼", "🌸", "🌹",
        "🌺", "🌻", "🌲", "🌳", "🌴",
        "🌵", "🌾", "🌿", "🍂", "🍁"
    ];
    const food = [
        "🍏", "🍎", "🍐", "🍊", "🍋",
        "🍌", "🍉", "🍇", "🍓", "🍈",
        "🍒", "🍑", "🍍", "🥭", "🥥",
        "🥝", "🍅", "🍆", "🥑", "🥦",
        "🥒", "🥬", "🥕", "🌽", "🌶",
        "🥔", "🍠", "🥐", "🍞", "🥖",
        "🥨", "🧀", "🥚", "🍳", "🥓",
        "🥩", "🍗", "🍖", "🌭", "🍔",
        "🍟", "🍕", "🥪", "🥙", "🧆",
        "🌮", "🌯", "🥗", "🥘", "🍲",
        "🍜", "🍝", "🍠", "🍣", "🍤",
        "🍦", "🍧", "🍨", "🍩", "🍪",
        "🎂", "🍰", "🍫", "🍬", "🍭",
        "🍮", "🍯", "🍼", "🥛", "☕",
        "🍵", "🍶", "🍾", "🍷", "🍸",
        "🍹", "🍺", "🍻", "🥂", "🥃",
        "🍽", "🍴", "🥄"
    ];
    const activities = [
        "⚽", "🏀", "🏈", "⚾", "🎾",
        "🏐", "🏉", "🎱", "🏓", "🏸",
        "🥅", "🎯", "🥌", "⛳", "🏹",
        "🎣", "🤿", "🥊", "🥋", "🎽",
        "🛹", "🛷", "⛸", "🥌", "🛶",
        "🚣", "🛳", "🏊", "🏄", "🏌",
        "🚵", "🚴", "🏇", "🧘", "🏂",
        "⛷", "🪂", "🪁", "🏋", "🤸",
        "⛹", "🤾", "🤼", "🧗", "🤹",
        "🧘", "🏌", "🏄", "🏊", "🚵"
    ];
    const travel = [
        "🚗", "🚕", "🚙", "🚌", "🚎",
        "🏎", "🚓", "🚑", "🚒", "🚐",
        "🛻", "🚚", "🚛", "🚜", "🛴",
        "🚲", "🛵", "🏍", "🚨", "🚔",
        "🚍", "🚘", "🚖", "🚡", "🚠",
        "🚟", "🚃", "🚋", "🚞", "🚝",
        "🚄", "🚅", "🚈", "🚂", "🚆",
        "🚇", "🚊", "🛩", "🛫", "🛬",
        "✈️", "🚀", "🛰", "🚁", "🛸",
        "🛳", "⛴", "🛥", "🚤", "⛵",
        "🚢", "⚓", "⛽", "🚧", "🚦",
        "🚥", "🗺", "🗿", "🗽", "🗼",
        "🏰", "🏯", "🏟", "🎡", "🎢",
        "🎠", "⛲", "⛱", "🏖", "🏝",
        "🏜", "🌋", "⛰", "🏔", "🗻",
        "🏕", "🏠", "🏡", "🏘", "🏚",
        "🏗", "🏢", "🏬", "🏣", "🏤",
        "🏥", "🏦", "🏨", "🏪", "🏫",
        "🏩", "💒", "🏛", "⛪", "🕌",
        "🕍", "🛕", "🕋", "⛩", "🕉",
        "🛤", "🛣", "🗾", "🎑", "🏞",
        "🌅", "🌄", "🌠", "🎇", "🎆"
    ];
    const objects = [
        "⌚", "📱", "📲", "💻", "⌨",
        "🖥", "🖨", "🖱", "🖲", "🕹",
        "🗜", "💽", "💾", "💿", "📀",
        "📼", "📷", "📸", "📹", "📼",
        "📺", "📻", "🎙", "🎚", "🎛",
        "⏱", "⏲", "⏰", "🕰", "⌛",
        "⏳", "📡", "🔋", "🔌", "💡",
        "🔦", "🕯", "🪔", "🧯", "🛢",
        "💸", "💵", "💴", "💶", "💷",
        "💰", "💳", "💎", "⚖", "🪜",
        "🧰", "🛠", "🪓", "🔧", "🔨",
        "⚒", "🛠", "🗡", "⚔", "🔪",
        "🛡", "🔩", "🦯", "🔗", "⛓",
        "🧲", "🧪", "🧫", "🧬", "🔬",
        "🔭", "📡", "💉", "🩸", "💊",
        "🩹", "🩺", "🚪", "🛏", "🛋",
        "🪑", "🚽", "🚿", "🛁", "🪒",
        "🧴", "🧷", "🧹", "🧺", "🧻",
        "🪣", "🧼", "🪥", "🧽", "🧯",
        "🛒", "🚬", "⚰", "⚱", "🏺",
        "🗿", "🪆", "🧿", "💈", "🦽",
        "🦼", "🦯", "💣", "🛠", "🪚",
        "🔨", "🪛", "🔧", "🗜", "🧰",
        "🧲", "🧫", "🧬", "💉", "💊",
        "🩺", "🩹", "🩸", "🚪", "🛏",
        "🛋", "🛋", "🪑", "🚽", "🚿",
        "🛁", "🧴", "🧷", "🧹", "🧺",
        "🧻", "🧼", "🧽", "🧯", "🛒"
    ];
    const symbols = [
        "❤️", "🧡", "💛", "💚", "💙",
        "💜", "🖤", "🤍", "🤎", "💔",
        "❣️", "💕", "💞", "💓", "💗",
        "💖", "💘", "💝", "💟", "☢️",
        "☣️", "📴", "📳", "⛔", "📛",
        "🚫", "❌", "⭕", "🚻", "🚮",
        "💢", "♨️", "🚷", "🚯", "🚳",
        "🚱", "🔞", "📵", "❗", "❕",
        "❓", "❔", "‼️", "⁉️", "🔅",
        "🔆", "〽️", "⚠️", "🚸", "🔱",
        "⚜️", "🔰", "♻️", "🌐", "✨",
        "💠", "Ⓜ️", "🌀", "💤", "🏳️‍🌈",
        "🚭", "🚬", "⚠️", "💱", "💲", 
    ];

  return (
    <div className='EmojiModal'>
        <div className='EmojiHead'>
            <button
                onClick={() => changeEmoji("all")}
                className={emojiState.all ? "button-active" : "button-inactive"}
            >ALL</button>
            <button
                onClick={() => changeEmoji("faces")}
                className={emojiState.faces ? "button-active" : "button-inactive"}
            >😐</button>
            <button
                onClick={() => changeEmoji("nature")}
                className={emojiState.nature ? "button-active" : "button-inactive"}
            >🐶</button>
            <button
                onClick={() => changeEmoji("food")}
                className={emojiState.food ? "button-active" : "button-inactive"}
            >🍉</button>
            <button
                onClick={() => changeEmoji("activities")}
                className={emojiState.activities ? "button-active" : "button-inactive"}
            >⚽</button>
            <button
                onClick={() => changeEmoji("travel")}
                className={emojiState.travel ? "button-active" : "button-inactive"}
            >✈️</button>
            <button
                onClick={() => changeEmoji("objects")}
                className={emojiState.objects ? "button-active" : "button-inactive"}
            >💻</button>
            <button
                onClick={() => changeEmoji("symbols")}
                className={emojiState.symbols ? "button-active" : "button-inactive"}
            >❤️</button>
        </div>
        <div className='EmojiBody'>
            {emojiState.all && [...faces, ...nature, ...activities, ...travel, ...objects, ...symbols].map((emoji, index) => (
                <span key={index} onClick={() => inputEmoji(emoji)}>{emoji}</span>
            ))}
            {emojiState.faces && faces.map((emoji, index) => (
            <span key={index} onClick={() => inputEmoji(emoji)}>{emoji}</span>
            ))}
            {emojiState.nature && nature.map((emoji, index) => (
            <span key={index} onClick={() => inputEmoji(emoji)}>{emoji}</span>
            ))}
            {emojiState.food && food.map((emoji, index) => (
            <span key={index} onClick={() => inputEmoji(emoji)}>{emoji}</span>
            ))}
            {emojiState.activities && activities.map((emoji, index) => (
            <span key={index} onClick={() => inputEmoji(emoji)}>{emoji}</span>
            ))}
            {emojiState.travel && travel.map((emoji, index) => (
            <span key={index} onClick={() => inputEmoji(emoji)}>{emoji}</span>
            ))}
            {emojiState.objects && objects.map((emoji, index) => (
            <span key={index} onClick={() => inputEmoji(emoji)}>{emoji}</span>
            ))}
            {emojiState.symbols && symbols.map((emoji, index) => (
            <span key={index} onClick={() => inputEmoji(emoji)}>{emoji}</span>
            ))}
        </div>
    </div>
  )
}

export default EmojiModal