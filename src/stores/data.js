import { defineStore } from "pinia";

export const useDataStore = defineStore("data", {
  state: () => {
    return {
      dataList: [
        {
          id: 1,
          title: "Service Bell",
          type: "Yoga",
          mediaUrl:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
          imageUrl:
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
          duration: "1 hour",
        },
        {
          id: 2,
          title: "Meadowlark",
          type: "Sleep",
          mediaUrl:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
          imageUrl:
            "https://images.unsplash.com/photo-1497290756760-23ac55edf36f",
          duration: "30 min",
        },
        {
          id: 3,
          title: "Hyena Laughing",
          type: "Meditation",
          mediaUrl: "https://soundbible.com/mp3/hyena-laugh_daniel-simion.mp3",
          imageUrl:
            "https://images.unsplash.com/photo-1499728603263-13726abce5fd",
          duration: "4 min",
        },
        {
          id: 4,
          title: "Creepy Background",
          type: "Breethe",
          mediaUrl:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
          imageUrl:
            "https://images.unsplash.com/photo-1444312645910-ffa973656eba",
          duration: "5 min",
        },
        {
          id: 5,
          title: "Service Bell Service Bell ",
          type: "Yoga",
          mediaUrl:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
          imageUrl:
            "https://images.unsplash.com/photo-1520769945061-0a448c463865",
          duration: "1 hour",
        },
        {
          id: 6,
          title: "Meadowlark2",
          type: "Sleep",
          mediaUrl:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
          imageUrl:
            "https://images.unsplash.com/photo-1524863479829-916d8e77f114",
          duration: "30 min",
        },
        {
          id: 7,
          title: "Hyena Laughing2",
          type: "Meditation",
          mediaUrl: "https://soundbible.com/mp3/hyena-laugh_daniel-simion.mp3",
          imageUrl: "https://images.unsplash.com/photo-1545389336-cf090694435e",
          duration: "4 min",
        },
        {
          id: 8,
          title: "Creepy Background2",
          type: "Breethe",
          mediaUrl:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
          imageUrl: "https://images.unsplash.com/photo-1547852356-b20668106c51",
          duration: "5 min",
        },
      ],
    };
  },

  actions: {
    increment() {
      this.count++;
    },
  },
});
