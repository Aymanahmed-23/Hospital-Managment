Eureka Discovery Server

This module runs a Netflix Eureka server for service discovery.

Run locally:

```bash
cd hospital-backend/eureka-server
mvn spring-boot:run
```

Default port: 8761

Register other services by pointing their `eureka.client.serviceUrl.defaultZone` to `http://localhost:8761/eureka/`.

Production: configure via environment variables or your deployment system as needed.
