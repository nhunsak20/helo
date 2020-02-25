select p.title, p.img, p.content, p.author_id, u.username, u.profile_pic
from posts p
join users u on p.author_id = u.id
where p.id = $1