import { defineStore } from "pinia";

export const usePlaylistStore = defineStore("playlist", {
  state: () => {
    return {
      playList: [
        {
          id: 1,
          title: "Yoga and Meditaion and its benefits",
          type: "Yoga",
          mediaUrl:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
          imageUrl:
            "https://images.unsplash.com/photo-1520190282873-afe1285c9a2a?fit=crop&w=1000&q=5",
          duration: "1 hour",
        },
        {
          id: 2,
          title: "Meadowlark is a AI generated song",
          type: "Sleep",
          mediaUrl:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
          imageUrl:
            "https://images.unsplash.com/photo-1495627744014-5595face04d4?fit=crop&w=1000&q=5",
          duration: "30 min",
        },
        {
          id: 3,
          title: "Dealing with chronic pain and stress after breakup",
          type: "Meditation",
          mediaUrl: "https://soundbible.com/mp3/hyena-laugh_daniel-simion.mp3",
          imageUrl:
            "https://images.unsplash.com/photo-1519623132083-41cc1f9d6636?fit=crop&w=1000&q=5",
          duration: "4 min",
        },
        {
          id: 4,
          title: "Sound helix is the source of this audio",
          type: "Breethe",
          mediaUrl:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
          imageUrl:
            "https://images.unsplash.com/photo-1656382647555-5b05e7c7f768?fit=crop&w=1000&q=5",
          duration: "5 min",
        },
        {
          id: 5,
          title: "Service Bell from sound helix",
          type: "Yoga",
          mediaUrl:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
          imageUrl:
            "https://images.unsplash.com/photo-1527702847878-05fc11667379?fit=crop&w=1000&q=5",
          duration: "1 hour",
        },
        {
          id: 6,
          title: "Meadowlark2",
          type: "Sleep",
          mediaUrl:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
          imageUrl:
            "https://images.unsplash.com/photo-1494777329614-3ec4d8902608?fit=crop&w=1000&q=5",
          duration: "30 min",
        },
        {
          id: 7,
          title: "Hyena Laughing2",
          type: "Meditation",
          mediaUrl: "https://soundbible.com/mp3/hyena-laugh_daniel-simion.mp3",
          imageUrl:
            "https://images.unsplash.com/photo-1525449167632-e115f893bfd9?fit=crop&w=1000&q=5",
          duration: "4 min",
        },
        {
          id: 8,
          title: "Creepy Background2",
          type: "Breethe",
          mediaUrl:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
          imageUrl:
            "https://images.unsplash.com/photo-1514970599-595c9d97af1c?fit=crop&w=1000&q=5",
          duration: "5 min",
        },
      ],
    };
  },

  actions: {
    // deleteItemfromPlaylist(item) {
    //   this.recentlyPlayedList = this.recentlyPlayedList.filter(
    //     (e) => e.title !== item
    //   );
    //   console.log(this.recentlyPlayedList.length);
    // },
  },
});
