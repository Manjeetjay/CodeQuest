package com.codequest.backend;

import com.codequest.backend.config.DotenvConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class BackendApplication {

	public static void main(String[] args) {
		DotenvConfig.initialize();

		SpringApplication.run(BackendApplication.class, args);
	}

}
