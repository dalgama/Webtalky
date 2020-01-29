--Example (Only to save queries we will need)
select P.name, count(*) count
from user as ui, rating as R, person as P
where R.rid= ui.userid and ui.userid=1
GROUP BY P.name, P.uid order by count DESC;




