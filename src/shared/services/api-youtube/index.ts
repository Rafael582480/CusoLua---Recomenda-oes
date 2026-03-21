import { youtube, youtube_v3 } from "@googleapis/youtube";

const youtubeApiClient = youtube({
    version: "v3",
    auth: process.env.YOUTUBE_API,
});

// Função auxiliar para buscar todas as páginas
async function getAllPlaylistItems(playlistId: string): Promise<youtube_v3.Schema$PlaylistItem[]> {
    const allItems: youtube_v3.Schema$PlaylistItem[] = [];
    let nextPageToken: string | undefined;
    
    do {
        const response = await youtubeApiClient.playlistItems.list({
            maxResults: 50,
            playlistId: playlistId,
            part: ["snippet"],
            pageToken: nextPageToken
        });
        
        if (response.data.items) {
            allItems.push(...response.data.items);
        }
        
        nextPageToken = response.data.nextPageToken || undefined;
        
    } while (nextPageToken);
    
    return allItems;
}

export const APIyoutube = {
    course: {
        getAll: async () => {
            const { data } = await youtubeApiClient.playlists.list({
                maxResults: 50,
                part: ["snippet"],
                channelId: "UCQN2C-WALDxkxbD2VDyR2zQ",
            });

            const courses = (data.items || [])?.map(item => ({
                id: item.id || "",
                title: item.snippet?.title || "",
                description: item.snippet?.description || "",
                image: item.snippet?.thumbnails?.high?.url || "",
            }));

            return courses;
        },
        
        getById: async (id: string) => {
            try {
                // Busca informações da playlist
                const playlistResponse = await youtubeApiClient.playlists.list({
                    id: [id],
                    maxResults: 50,
                    part: ["snippet", "contentDetails"]
                });
                
                // Verifica se existe e pega o primeiro item
                const courseItem = playlistResponse.data.items?.[0];
                
                if (!courseItem) {
                    throw new Error(`Playlist com ID ${id} não encontrada`);
                }

                // Busca todos os itens da playlist usando a função auxiliar
                const classes = await getAllPlaylistItems(id);

                // Mapeia as aulas
                const mappedClasses = classes
                    .sort((a, b) => (a.snippet?.position || 0) - (b.snippet?.position || 0))
                    .map(item => ({
                        id: item.id || "",
                        videoId: item.snippet?.resourceId?.videoId || "",
                        title: item.snippet?.title || "",
                        description: item.snippet?.description || ""
                    }));

                // Cria o grupo de aulas
                const classGroup = [{
                    title: courseItem.snippet?.title || "Aulas",
                    courseId: id,
                    classes: mappedClasses.map(({ id, videoId, title }) => ({
                        id,
                        videoId,
                        title
                    }))
                }];

                return {
                    id,
                    title: courseItem.snippet?.title || "",
                    description: courseItem.snippet?.description || "",
                    image: courseItem.snippet?.thumbnails?.high?.url || "",
                    classGroup,
                    numberOfClasses: classes.length,
                };
                
            } catch (error) {
                console.error("Erro ao buscar playlist:", error);
                // Retorna um objeto com valores padrão em caso de erro
                return {
                    id,
                    title: "Erro ao carregar curso",
                    description: "Não foi possível carregar as informações do curso",
                    image: "",
                    classGroup: [],
                    numberOfClasses: 0,
                };
            }
        }
    }
};