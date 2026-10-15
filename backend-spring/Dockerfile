FROM eclipse-temurin:17-jre
WORKDIR /app
COPY target/*.jar app.jar
USER 1000
ENTRYPOINT ["java", "-jar", "app.jar"]