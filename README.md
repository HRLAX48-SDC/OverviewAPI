systemScale was an exercise in gaining exposure to the world of scaling an application for high traffic. We were given an assortment of .CSV files, each with over 5 million records, and told to return the expected data in a designated shape in an efficient manner.


In systemScale, a PostgreSQL database was paired with an Express server to serve a provided React front end client.

Once a desired throughput was reached on the local machine, it was time to deploy.
![image](https://user-images.githubusercontent.com/91905768/153095190-750462f5-5467-4f64-8997-c5d66ef142cc.png)


The deployment plan at the start was to utilize separate instances for the server and database to reduce load. To get the ball rolling, I wanted to stick with a 1:1 pair to get a performance baseline before attempting to optimize further.
![image](https://user-images.githubusercontent.com/91905768/153095584-ef09b309-7369-4bcc-a9b1-cd74b18418b1.png)


Around 1000 requests per second, my 1:1 system started to fall behind. While every request brought back a response, by the end of the testing the average response time was all the way up to 2,000ms which was unacceptable.

My next step was to implement a load balancer and a 2nd server instance. Initial improvements were very promising... I put the 2 servers behind an NGINX load balancer and saw the average response time fall from 2,000ms to just 84ms. I attempted to utilize both a round robin as well as least_connections load balancing scheme and found no meaningful difference between the two. Ultimately I ended up sticking with the least_connections strategy because while I saw no tangible difference in the data, logically I imagined that it would be unlikely that every query will return in the same amount of time, eventually leading to imbalance as the number of requests grew if I was using the round robin strategy.

Next step was to implement caching in the load balancer. After some fine tuning and manipulating the different options available in NGINX, I was able to reach 8,000 requests per second on 2 of my 4 endpoints with an average response time under 70ms. Increasing the number of active worker connections allowed me to push even further to serve 9,000 requests per second with no increase in average response time.

The final optimization I tried was implementing a Redis cache at the server level. I had heard great things about Redis and was quite excited to get it implemented only to find that it made very little difference when paired with the NGINX caching. I continued to utilize it as I figured it would just increase reliability with another layer of caching but saw no notable performance gains in average response time or request throughput.

# Final Results

Overall, the optimization in systemScale took my endpoints from serving 100 requests per second to over 9,000 without utilizing any additional budget. My final numbers for each endpoint were:
![image](https://user-images.githubusercontent.com/91905768/153095866-a6926bfa-bb06-4221-bd91-c3a26efbdc2d.png)
![image](https://user-images.githubusercontent.com/91905768/153095888-8b766037-4f85-40db-b03b-787076b2b819.png)
![image](https://user-images.githubusercontent.com/91905768/153095900-4ec7525d-3fc1-4a2c-8caa-05e70289e79e.png)
![image](https://user-images.githubusercontent.com/91905768/153095913-696984ef-6866-493d-b4da-22ef67d054c8.png)

The single largest optimization I made was implementing the NGINX cache which took me from ~2,000 RPS to north of 8,000 in some routes. Without a doubt this was the MVP of systemScale for me. The next closest was likely the introduction of the load balancer on its own and splitting the requests between 2 servers. However, while the increase from 1 to 2 servers was relatively impactful, the increase from 2 to 3 and then 4 was marginal. Similarly, I saw little difference with my choice of least_connections instead of round robin for the load balancing strategy. Adding Redis caching was also a bit of a letdown as I saw negligible difference with and without it implemented on my API servers. The last quantifiable increase in performance was raising the number of active workers in NGINX from the default value of 7XX to the AWS soft limit of 1024. At the end, the bottleneck in my final setup seemed to be the database so any further optimization would've taken place there but I was happy enough with my final results to not delve deeper and instead focus on other things. If I were to go back and start over again, I'd be curious to build the backend from the ground up again using a NoSQL database to see how things would compare.
