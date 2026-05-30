package com.example.demo.configs.PostgreSQL;

import jakarta.persistence.EntityManagerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.autoconfigure.DataSourceProperties;
import org.springframework.boot.jpa.EntityManagerFactoryBuilder;
import org.springframework.boot.persistence.autoconfigure.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.sql.DataSource;

@Configuration
@EnableTransactionManagement
@EntityScan(basePackages = "com.example.demo")
@EnableJpaRepositories(
        basePackages = "com.example.demo",
        entityManagerFactoryRef = "postgreSQLFactoryManager",
        transactionManagerRef = "postgreSQLTransactionManager"
)
@EnableJpaAuditing
public class PostgresConfig {

    @Bean
    @ConfigurationProperties("spring.datasource")
    public DataSourceProperties postgreSQLDataSourceProperties() {
        return new DataSourceProperties();
    }

    @Bean(name = "postgreSQLDataSource")
    public DataSource postgreSQLDataSource(@Qualifier("postgreSQLDataSourceProperties") DataSourceProperties dsp) {
        return dsp.initializeDataSourceBuilder().build();
    }

    @Bean(name = "postgreSQLFactoryManager")
    public LocalContainerEntityManagerFactoryBean postgreSQLFactoryManager(
            EntityManagerFactoryBuilder builder,
            @Qualifier("postgreSQLDataSource") DataSource dataSource) {
        return builder
                .dataSource(dataSource)
                .packages("com.example.demo")
                .persistenceUnit("postgreSQLPU")
                .build();
    }

    @Bean(name = "postgreSQLTransactionManager")
    public PlatformTransactionManager postgreSQLTransactionManager(
            @Qualifier("postgreSQLFactoryManager") EntityManagerFactory emf) {
        return new JpaTransactionManager(emf);
    }
}
