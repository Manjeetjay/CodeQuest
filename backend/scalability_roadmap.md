# Backend Scalability Roadmap

This document outlines a progressive, deployment-friendly plan to scale the backend architecture.
Each phase is designed to be shipped independently without breaking existing functionality.

## Phase 1: Caching Strategy (Quick Wins)
*Goal: Reduce database load and improve read response times for high-traffic endpoints.*

- [ ] **1.1 Setup Redis Infrastructure**
  - Add `spring-boot-starter-data-redis` to `pom.xml`.
  - Configure Redis connection properties in `application.yml` and Render environment.
- [ ] **1.2 Cache Problem Catalog**
  - Implement `@Cacheable("problemsList")` on `ProblemService.getAllProblems()`.
  - Implement `@Cacheable("problemDetails")` on `ProblemService.getProblem(id)`.
- [ ] **1.3 Cache Invalidation**
  - Add `@CacheEvict` logic on problem creation, update, and deletion to ensure data consistency.
- [ ] **1.4 (Test & Deploy)** 
  - Deploy Redis container. Deploy updated backend. Monitor cache hit rates.

## Phase 2: Dynamic Template Generation
*Goal: Solve the wrapper code duplication issue by dynamically generating boilerplates based on function signatures.*

- [ ] **2.1 Define Code Signature Models**
  - Create `FunctionSignature` class (Function Name, Return Type, List of Parameters).
  - Update `Problem` entity to store a JSON representation of `FunctionSignature` instead of static `wrapperCode` and lists of `Template`.
- [ ] **2.2 Implement `CodeGeneratorService`**
  - Create strategy pattern for supported languages (Java, Python, C++, JS).
  - Write logic to generate the user-facing template (e.g., `public int solve(int a, int[] b) { ... }`).
  - Write logic to generate the hidden execution wrapper code (parsing stdin, calling `solve`, printing to stdout).
- [ ] **2.3 Integrate with `ProblemService` and `SubmissionService`**
  - Modify `ProblemService` to return generated templates dynamically on API requests.
  - Modify `SubmissionService` to prepend the dynamically generated wrapper code before sending it to Judge0.
- [ ] **2.4 (Test & Deploy)**
  - Migrate existing problems to the new signature format. Deploy and verify problem compilation.

## Phase 3: Message Queue & Asynchronous Processing
*Goal: Replace `Thread.sleep()` blocking calls in submissions to handle high concurrency effectively.*

- [ ] **3.1 Setup Message Broker (Redis Pub/Sub or Kafka)**
  - Choose Redis queues (simpler, already added in Phase 1) or standalone Kafka.
  - Add necessary Spring integration dependencies.
- [ ] **3.2 Producer Interface for Submissions**
  - Modify `SubmissionService.createSubmission` to push a `SubmissionMessage` to the queue instead of processing it asynchronously in memory.
- [ ] **3.3 Consumer Worker for Judge0**
  - Create a worker service that polls the queue.
  - Worker calls Judge0 batch submission API.
- [ ] **3.4 Webhook or Delayed Queue for Results**
  - *Option A (Recommended)*: Update Judge0 payload to include a `callback_url`. Create a new endpoint `/api/submissions/callback` in the backend to receive Judge0 results directly.
  - *Option B*: Publish a message to a delayed queue (or scheduling) to poll results later without blocking threads.
- [ ] **3.5 (Test & Deploy)**
  - Deploy worker configuration. Benchmark submission throughput securely.

## Phase 4: Email and Notification Service
*Goal: Keep users engaged with updates, password resets, and submission success/failure notifications.*

- [ ] **4.1 Setup Email Provider**
  - Add `spring-boot-starter-mail` dependency.
  - Configure SMTP settings (e.g., SendGrid, AWS SES) via environment variables.
- [ ] **4.2 Implement `NotificationService`**
  - Create service to format and send emails (using Thymeleaf templates for beautiful emails).
- [ ] **4.3 Trigger Notifications Securely**
  - Publish notification events to the Message Queue (from Phase 3) to offload email sending from the main thread.
  - Create a consumer to handle sending the emails asynchronously.
- [ ] **4.4 (Test & Deploy)**
  - Integrate with user registration (Welcome email) and maybe daily challenges. Deploy and verify delivery.

## Phase 5: Error Handling & Centralized Logging
*Goal: Ensure the system is observable and resilient, catching edge cases without bringing down the application.*

- [ ] **5.1 Global Exception Handler (ControllerAdvice)**
  - Audit and expand the existing `@ControllerAdvice` to capture generic exceptions, specific domain exceptions, and input validation errors.
  - Standardize error response payloads (e.g., `{"error": "...", "code": 404, "timestamp": "..."}`).
- [ ] **5.2 Structured Logging**
  - Configure `logback-spring.xml` or properties to format logs as JSON for easy ingestion by log aggregators.
  - Add correlation IDs (MDC) to track requests across different services and threads.
- [ ] **5.3 Application Performance Monitoring (APM)**
  - Integrate a tool like Datadog, New Relic, or open-source ELK/Grafana stack.
  - Surface error rates and latency percentiles on a dashboard.
- [ ] **5.4 (Test & Deploy)**
  - Fire intentional bad requests and verify they are correctly intercepted, sanitized (no stack traces returning to users), and logged deeply.
