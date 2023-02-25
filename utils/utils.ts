import Files from "../public/assets.json"
import type { Playlist, Track } from "../context/context-types"

export const getAllFiles = (): { playlist: Playlist[]; new_t: Track[]; popular: Track[] } => {
	return { playlist: Files.playlist, new_t: Files.new, popular: Files.popular }
}
export const getAllPlaylist = (): Playlist[] => {
	return Files.playlist ? Files.playlist : []
}
export const getSinglePlaylist = (id: string | number) => {
	return Files.playlist.find(item => String(item.id) == String(id))
}
