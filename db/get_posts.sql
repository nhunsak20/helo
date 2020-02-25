select p.id, p.title, p.img, p.author_id, u.username, u.profile_pic
from posts p
join users u on p.author_id = u.id
where p.author_id = $1