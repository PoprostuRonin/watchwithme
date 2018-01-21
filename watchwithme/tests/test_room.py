from watchwithme import youtube
from watchwithme.models import room
from watchwithme.models.video import Video

r = room.Room('this2is6unique')


def test_is_playlist_added():
    def mock_get_playlist_info(playlist_id):
        return {
            'title': 'This is sample playlist',
            'description': 'You shoudn\'t read this...',
            'channelId': 'noThis66notachanlle',
            'channelTitle': 'NoNoChananel',
        }

    def mock_get_playlist_items(playlist_id, page_token=""):
        return [
            Video.from_dict({
                'id': 'y6120QOlsfU',
                'title': 'Darude - Sandstorm',
                'thumbnail': 'https://i.ytimg.com/vi/y6120QOlsfU/hqdefault.jpg'
            }),
            Video.from_dict({
                'id': 'Be0OAjuk_1k',
                'title': 'Scatman John - Scatman (Extended Mix) 1995',
                'thumbnail': 'https://i.ytimg.com/vi/Be0OAjuk_1k/hqdefault.jpg'
            })]

    youtube.get_playlist_items = mock_get_playlist_items
    youtube.get_playlist_info = mock_get_playlist_info
    r.import_yt_playlist('PL3hSzXlZKYpM8XhxS0v7v4SB2aWLeCcUj')
    assert len(r.playlists) == 1


def test_is_playlist_removed():
    r.remove_playlist('PL3hSzXlZKYpM8XhxS0v7v4SB2aWLeCcUj')
    assert len(r.playlists) == 0
