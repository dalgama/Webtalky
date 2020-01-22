

--Example (Only to save queries we will need)
select P.name, P.uid, count(*) count
from Restaurant as Re, rating as R, person as P
where P.uid=R.uid and R.rid= Re.rid and Re.rid=100400
GROUP BY P.name, P.uid order by count DESC;




