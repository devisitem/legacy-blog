---
layout: post
title: -Spring- TransactionManager (트랜잭션 관리자)
categories: [Development,Spring]
tags: [Spring,Spring Boot]
date: 2021-11-01 18:58:00 +0900
thumbnail: "/assets/img/bloging/spring/spring_logo.png"
excerpt_separator: <!--more-->
hide: false
---
AbstractPlatformTransactionManager의 기능과 작업흐름

<!--more-->

## AbstractPlatformTransactionManager



Spring은 Transaction Manager를 추상화하여 간단하게 사용할수 있어요. `DataSourceTransactionManager` 이던 `HibernateSessionMannager` 던 등등 다른 Transaction Manager를 하나로 추상화 되어있는 `AbstractPlatformTransactionManager`를 상황에 맞는 구성을 Spring이 구성해주기때문에 별다른 설정없이 사용하면 됩니다.



### 설명

Abstract base class that implements Spring's standard transaction workflow, serving as basis for concrete platform transaction managers like org.springframework.transaction.jta.JtaTransactionManager.
This base class provides the following workflow handling:
s
* determines if there is an existing transaction;

* applies the appropriate propagation behavior;

* suspends and resumes transactions if necessary;

* checks the rollback-only flag on commit;

* applies the appropriate modification on rollback (actual rollback or setting rollback-only);

* triggers registered synchronization callbacks (if transaction synchronization is active).



Subclasses have to implement specific template methods for specific states of a transaction, e.g.: begin, suspend, resume, commit, rollback. The most important of them are abstract and must be provided by a concrete implementation; for the rest, defaults are provided, so overriding is optional.

Transaction synchronization is a generic mechanism for registering callbacks that get invoked at transaction completion time. This is mainly used internally by the data access support classes for JDBC, Hibernate, JPA, etc when running within a JTA transaction: They register resources that are opened within the transaction for closing at transaction completion time, allowing e.g. for reuse of the same Hibernate Session within the transaction. The same mechanism can also be leveraged for custom synchronization needs in an application.



The state of this class is serializable, to allow for serializing the transaction strategy along with proxies that carry a transaction interceptor. It is up to subclasses if they wish to make their state to be serializable too. They should implement the java.io.Serializable marker interface in that case, and potentially a private readObject() method (according to Java serialization rules) if they need to restore any transient state.



`org.springframework.transaction.jta.JtaTransactionManager` 같이 실제 플랫폼 트랜잭션매니저의 기반으로 사용되는 Spring의 표준 트랜잭션 작업흐름 구현체, 추상 기본  클래스입니다.

이 기본 클래스는 다음의  작업흐름을 처리를 제공합니다.

* 트랜잭션이 있는지 판단합니다.
* 적절한 전파 동작을 적용합니다.
* 필요하다면 트랜잭션을 중단하고 재개합니다.
* 커밋 시 rollback-only 표시를 확인합니다.
* 롤백 시 적절한 수정 사항을 적용합니다. (실제 롤백 또는  rollback-only를 설정해서)
* 등록된 동기화 콜백을 트리거합니다. (트랜잭션 동기화가 활성화 된 경우)



하위클래스는 트랜잭션의 특정 상태에대한 특정 템플릿 메서드를 구현해야합니다 (예:  중단, 재개, 커밋, 롤백전). 가장중요한 건 추상화와 실제 구현체로 제공되어야만 하는것이고, 그외에는 기본값이 제공되므로 `overriding` 선택사항 입니다.



트랜잭션 동기화는 트랜잭션 완료시간에 호출되는 콜백을 등록하기위한 일반적인 메커니즘입니다. 이것은 JTA 트랜잭션 내에서 동작할때 JDBC, 하이버네이트, JPA 등등에 대한 데이터 접근클래스로부터 내부적으로 사용됩니다. (트랜잭션 완료 시간에 닫히기 위해 트랜잭션 내에서 개방된 리소스를 등록합니다. 예 : 트랜잭션 내 동일한 하이버네이트 세션의 재사용을 위해 )  



이 클래스의 상태는 직렬화 가능하여  트랜잭션 인터셉터를 전달하는 프록시와 마찬가지로 트랜잭션 전략를 직렬화할 수 있습니다. 이것은 하위클래스에 달려있는데, 상태를 직렬화 되게 만들고 싶다면 그렇게하세요. 이 경우에 하위클래스는 마커 인터페이스인 `java.io.Seializable` 를 구현해야하며 일시적인 상태를 복원해야하는경우 잠재적으로 `private` readObject()  메소드 (자바 직렬화 규칙에따라 )를 구현해야합니다.



### 필드

* SYNCHRONIZATION_ALWAYS = 0;

  * 트랜잭션 동기화를 항상 활성화며 기존 백엔드 트랜잭션이 없는 PROPAGATION_SUPPORTS인 "비어있는" 트랜잭션 까지도 적용됩니다.



* SYNCHRONIZATION_ON_ACTUAL_TRANSACTION = 1;

  * 실제 트랜잭션을 위해서만 트랜잭션 동기화를 활성화 하며, 기존 백엔드 트랜잭션이 없는  PROPAGATION_SUPPORTS 인 비어있는 트랜잭션에는 적용되지 않습니다.



* SYNCHRONIZATION_NEVER = 2;

  * 실제 트랜잭션까지도 트랜잭션동기화를 활성화하지 않습니다.

## 설정기능

AbstactPlatformTransactionManager는 트랜잭션 동기화를 등록하고 관리할 수 있습니다.



#### final setTransactionSynchronizationName(String constantName)

* 이 클래스의 해당 상수명으로 트랜잭션 동기화를 설정합니다.



#### final setTransactionSynchronization( int transactionSynchronization)

* 이 트랜잭션 매니저가 Thread-bound 트랜잭션 동기화 지원을 활성화 해야만 할때 설정합니다. 기본값은 `SYNCHRONIZATION_ALWAYS` 입니다.
* 참고로 트랜잭션 동기화는 다른 트랜잭션 매니저에 의해 다중 동시 트랜잭션을 지원하지 않습니다. 한개의 트랜잭션 매니저만이 이것을 언제든지 허용할 수 있습니다.



#### final setDefaultTimeout(int defaultTimeout)

* 트랜잭션 레벨에 초단위로 명시된 타임아웃이 없는경우 이 트랜잭션 매니저가 적용해야만하는 기본 타임아웃을 명시합니다.
* 기본값은 근본적인 트랜잭션 인프라 기본 타임아웃(예: 일반적으로, JTA Provider 의 경우 30초)이며, TransactionDefinition.TIMEOUT_DEFAULT 값으로 나타납니다.



#### final setNestedTransactionAllowed(boolean nestedTransactionAllowed)

* 기본값은 "false"이며, 중복 트랜잭을 허용할지 설정합니다.
* 일반적으로 구체적인 트랜잭션 매니저 하위클래스에 의해 적절한 기본값으로 초기화 됩니다.



#### final setValidateExistingTransaction(boolean validateExistingTransaction)

* 기존 트랜잭션에 참여하기 전에 검증돼야하는지 설정합니다.
* 기존 트랜잭션(예: PROPAGATION_REQUIRED 또는 PROPAGATION_SUPPORT가 기존 트랜잭션을 만나는 경우)에 참여할때, 이 외부 트랜잭션의 형질은 내부 트랜잭션영역에 까지도 적용됩니다.
* 유효성 검사는 내부 트랜잭션 정의에서 호환되지 않는 고립레벨 및 읽기전용 설정을 감지하고 해당 예외를 throw하여 이에따라 참여를 거부합니다.
* 기본값은 "false"이며, 내부 트랜잭션 설정을 느슨하게 무시하여, 외부 트랜잭션의 형질로 간단히 재정의 합니다.
* "true" 플래그로 변경은 엄격한 유효성검사를 강제하도록 명령합니다.



#### final setGlobalRollbackOnParticipationFailure(boolean gloabalRollbackOnParticipationFailure)

* 참여하는 트랜잭션이 실패한후에 기존 트랜잭션을 `rollback-only`로 전역적으로 표시할지 설정합니다.
* 기본값은 "true"이며, 참여하는 트랜잭션(예: PROPAGATION_REQUIRED 또는 PROPAGATION_SUPPORT가 기존 트랜잭션을 만나는 경우)이 실패한다면, 트랜잭션은 `rollback-only`로 전역적으로 표시됩니다.  그런 트랜잭션에 오직 가능한 결과는 롤백입니다.*
* “false”로 변경시: 트랜잭션 발신자가 롤백 결정을 내립니다. 만약 참여하는 트랜잭션이 예외로 실패한다면, 호출자는 트랜잭션 내 다른경로로 계속하기로 결정할 수 있습니다. 하지만, 이는 모든 참여 자원이 데이터 액세스 실패 후에도 트랜잭션 커밋을 향해 계속할 수 있는 경우에만 작동합니다. (일반적으로 Hibernate 세션은 해당되지 않는 경우입니다. 예: JDBC insert/update/delete 동작들의 sequence)
* **참고: ** 이 플래그는 일반적으로 데이터 접근 작업(TransactionInterceptor가 롤백룰에 따라 PlatformTransactionManager.rollback() 호출을 트리거하는 경우)으로 인해 throw 된 예외가 발생한 하위 트랜잭션에 대한 명시적 롤백시도에만 적용됩니다. 플래그가 비활성화라면 호출자는 하위 트랜잭션의 롤백룰과 관계없이 예외를 처리하고 롤백을 결정할 수 있습니다. 그러나 이 플래그는 하위트랜잭션에 명시적 `setRollbackOnly` 호출을 적용하지 않으므로,이는  항상 최종적인 글로벌 롤백(`rollback-only` 호출후 예외가 발생하지 않을 수 있기 때문에 )을 유발합니다.
* 하위트랜잭션의 실패처리에 대한 추천드리는 방법은 글로벌 트랜잭션이 하위트랜잭션의 시작시 가져온 세이브포인트로 롤백될 수 있도록 하는 “중복 트랜잭션” 입니다. `PROPAGATION_NESTED`는 정확히 이러한 의미를 제공합니다. 그러나, 중복 트랜잭션 지원이 가능할 때만 동작합니다. `DataSource TransactionManager` 경우지만, `JtaTransactionManager`의 경우는 아닙니다.


#### final setFailEarlyOnGlobalRollbackOnly(boolean failEarlyOnGlobalRollbackOnly)
* 트랜잭션이 `rollback-only`로 전역적으로 표시된 경우에 조기 실패할 것 인지 설정합니다.
* 기본값은 “false” 이며, 가장 바깥쪽의 트랜잭션 바운더리에서만 `UnexpectedRollbackExcetpion`을 발생시킵니다. 내부 트랜잭션 바운더리 내에서  까지 전역 rollback-only 표시자가 처음 감지하여 즉시 `UnexpectedRollbackException`을 발생시키려면 이 값을 변경하세요.
* 참고로 스프링 2.0부터 전역  rollback-only 표시자에 대한 조기실패 동작이 통합 되었습니다. (모든 트랜잭션 매니져는 기본적으로 가장 바깥쪽의 트랜잭션 바운더리에서만 `UnexpectedRollbackException`을 발생시킵니다.) 이 허용 예를들어 동작이 실패하고 트랜잭션이 완료되지 않은 후에도 유닛 테스트를 계속할 수 있습니다. 모든 트랜잭션 매니저는 이 플래그가 명시적으로 "true"로 설정됐을 때만 조기실패 시킵니다.

#### final setRollbackOnCommitFailure(boolean rollbackOnCommitFailure)
*  `doCommit`메소드 호출의 실패에 `doRollback`이 수행 해야만하는지 설정합니다. 일반적으로 필요하지 않고 후속 롤백 예외로 커밋 예외를 무시할 가능성이 있으며, 따라서 피해야합니다.

## PlatformTransactionManager 구현체


### final getTransaction(TransactionDefinition definition)

```Java
@Override
	public final TransactionStatus getTransaction(@Nullable TransactionDefinition definition)
			throws TransactionException {

		// Use defaults if no transaction definition given.
		TransactionDefinition def = (definition != null ? definition : TransactionDefinition.withDefaults());

		Object transaction = doGetTransaction();
		boolean debugEnabled = logger.isDebugEnabled();

		if (isExistingTransaction(transaction)) {
			// Existing transaction found -> check propagation behavior to find out how to behave.
			return handleExistingTransaction(def, transaction, debugEnabled);
		}

		// Check definition settings for new transaction.
		if (def.getTimeout() < TransactionDefinition.TIMEOUT_DEFAULT) {
			throw new InvalidTimeoutException("Invalid transaction timeout", def.getTimeout());
		}

		// No existing transaction found -> check propagation behavior to find out how to proceed.
		if (def.getPropagationBehavior() == TransactionDefinition.PROPAGATION_MANDATORY) {
			throw new IllegalTransactionStateException(
					"No existing transaction found for transaction marked with propagation 'mandatory'");
		}
		else if (def.getPropagationBehavior() == TransactionDefinition.PROPAGATION_REQUIRED ||
				def.getPropagationBehavior() == TransactionDefinition.PROPAGATION_REQUIRES_NEW ||
				def.getPropagationBehavior() == TransactionDefinition.PROPAGATION_NESTED) {
			SuspendedResourcesHolder suspendedResources = suspend(null);
			if (debugEnabled) {
				logger.debug("Creating new transaction with name [" + def.getName() + "]: " + def);
			}
			try {
				return startTransaction(def, transaction, debugEnabled, suspendedResources);
			}
			catch (RuntimeException | Error ex) {
				resume(null, suspendedResources);
				throw ex;
			}
		}
		else {
			// Create "empty" transaction: no actual transaction, but potentially synchronization.
			if (def.getIsolationLevel() != TransactionDefinition.ISOLATION_DEFAULT && logger.isWarnEnabled()) {
				logger.warn("Custom isolation level specified but no actual transaction initiated; " +
						"isolation level will effectively be ignored: " + def);
			}
			boolean newSynchronization = (getTransactionSynchronization() == SYNCHRONIZATION_ALWAYS);
			return prepareTransactionStatus(def, null, true, newSynchronization, debugEnabled, null);
		}
	}
```

이 구현체는 전파동작을 처리합니다. doGetTransaction, isExistingTransaction 및 doBegin 메서드를 위임합니다.
설정된 값을 먼저확인하고 없다면 기본값으로 세팅하  트랜잭션을 가져옵니다. 제일먼저 `TransactionDefinition` 기본값 세팅 후 `doGetTransaction`으로 트랜잭션을 불러옵니다.
이 메서드에서는 먼저 살펴봐야할 메서드가 3가지정도로 나눌수 있어요. `doGetTransaction`, `handleExistingTransaction`, `doBegin`을 보며 유추합니다.


#### doGetTransaction

* 현재 트랜잭션 상태에대한 트랜잭션 객체를 리턴하는 메서드에요.
* 반환된 객체는 일반적으로 변경할수 있는 방식에 해당하는 트랜잭션을 전달하여 구체적인 트랜잭션 매니저 구현체에 명시됩니다.


이 메서드는 추상화되어있고 각 구현체인 Transaction Manager들에 의하여 구현되있어요. 일반적으로 `JDBC`를 사용하는 `DataSourceTransactionManager`를 예로 볼거에요.

```java
@Override
protected Object doGetTransaction() {
  DataSourceTransactionObject txObject = new DataSourceTransactionObject();
  txObject.setSavepointAllowed(isNestedTransactionAllowed());
  ConnectionHolder conHolder =
      (ConnectionHolder) TransactionSynchronizationManager.getResource(obtainDataSource());
  txObject.setConnectionHolder(conHolder, false);
  return txObject;
}
```
`line 4`에서 세이브포인트를 이 트랜잭션내에서 허용될 것인지를 정하고 매개변수로 중첩트랜잭션의 허용 여부을 보냅니다. `line 5`에 `ConnnectionHolder`가 컨넥션 및 세이브 포인트를 생성합니다. 아래 코드를 보시면 세이브포인트의 네이밍을 확인할 수 있죠.

```java
public Savepoint createSavepoint() throws SQLException {
		this.savepointCounter++;
		return getConnection().setSavepoint(SAVEPOINT_NAME_PREFIX + this.savepointCounter);
	}
```
트랜잭션 내에서 `SAVEPOINT_0`, `SAVEPOINT_1` .. 이런식으로 생성되면서 갯수를 체크하죠. `ConnectionHolder`는 현재 설정된 DataSource로 `Connnection`을 생성하여 할당 합니다. 결과적으로 세이브포인트 사용 여부와 컨넥션을 가지고 트랜잭션 객체를 반환해요.

#### handleExistingTransaction
트랜잭션이 존재하는지 확인하고 존재한다면 `handleExistingTransaction`으로 보내버립니다.

```java
private TransactionStatus handleExistingTransaction(
			TransactionDefinition definition, Object transaction, boolean debugEnabled)
			throws TransactionException {

		if (definition.getPropagationBehavior() == TransactionDefinition.PROPAGATION_NEVER) {
			throw new IllegalTransactionStateException(
					"Existing transaction found for transaction marked with propagation 'never'");
		}

		if (definition.getPropagationBehavior() == TransactionDefinition.PROPAGATION_NOT_SUPPORTED) {
			if (debugEnabled) {
				logger.debug("Suspending current transaction");
			}
			Object suspendedResources = suspend(transaction);
			boolean newSynchronization = (getTransactionSynchronization() == SYNCHRONIZATION_ALWAYS);
			return prepareTransactionStatus(
					definition, null, false, newSynchronization, debugEnabled, suspendedResources);
		}

		if (definition.getPropagationBehavior() == TransactionDefinition.PROPAGATION_REQUIRES_NEW) {
			if (debugEnabled) {
				logger.debug("Suspending current transaction, creating new transaction with name [" +
						definition.getName() + "]");
			}
			SuspendedResourcesHolder suspendedResources = suspend(transaction);
			try {
				return startTransaction(definition, transaction, debugEnabled, suspendedResources);
			}
			catch (RuntimeException | Error beginEx) {
				resumeAfterBeginException(transaction, suspendedResources, beginEx);
				throw beginEx;
			}
		}

		if (definition.getPropagationBehavior() == TransactionDefinition.PROPAGATION_NESTED) {
			if (!isNestedTransactionAllowed()) {
				throw new NestedTransactionNotSupportedException(
						"Transaction manager does not allow nested transactions by default - " +
						"specify 'nestedTransactionAllowed' property with value 'true'");
			}
			if (debugEnabled) {
				logger.debug("Creating nested transaction with name [" + definition.getName() + "]");
			}
			if (useSavepointForNestedTransaction()) {
				// Create savepoint within existing Spring-managed transaction,
				// through the SavepointManager API implemented by TransactionStatus.
				// Usually uses JDBC 3.0 savepoints. Never activates Spring synchronization.
				DefaultTransactionStatus status =
						prepareTransactionStatus(definition, transaction, false, false, debugEnabled, null);
				status.createAndHoldSavepoint();
				return status;
			}
			else {
				// Nested transaction through nested begin and commit/rollback calls.
				// Usually only for JTA: Spring synchronization might get activated here
				// in case of a pre-existing JTA transaction.
				return startTransaction(definition, transaction, debugEnabled, null);
			}
		}

		// Assumably PROPAGATION_SUPPORTS or PROPAGATION_REQUIRED.
		if (debugEnabled) {
			logger.debug("Participating in existing transaction");
		}
		if (isValidateExistingTransaction()) {
			if (definition.getIsolationLevel() != TransactionDefinition.ISOLATION_DEFAULT) {
				Integer currentIsolationLevel = TransactionSynchronizationManager.getCurrentTransactionIsolationLevel();
				if (currentIsolationLevel == null || currentIsolationLevel != definition.getIsolationLevel()) {
					Constants isoConstants = DefaultTransactionDefinition.constants;
					throw new IllegalTransactionStateException("Participating transaction with definition [" +
							definition + "] specifies isolation level which is incompatible with existing transaction: " +
							(currentIsolationLevel != null ?
									isoConstants.toCode(currentIsolationLevel, DefaultTransactionDefinition.PREFIX_ISOLATION) :
									"(unknown)"));
				}
			}
			if (!definition.isReadOnly()) {
				if (TransactionSynchronizationManager.isCurrentTransactionReadOnly()) {
					throw new IllegalTransactionStateException("Participating transaction with definition [" +
							definition + "] is not marked as read-only but existing transaction is");
				}
			}
		}
		boolean newSynchronization = (getTransactionSynchronization() != SYNCHRONIZATION_NEVER);
		return prepareTransactionStatus(definition, transaction, false, newSynchronization, debugEnabled, null);
	}
```
`PROPAGATION_NEVER`은 현재 트랜잭션이 존재한다면 바로 예외를 throwing 하고,  `PROPAGATION_NOT_SUPPORTED`는 현재 트랜잭션을 중지합니다.
`PROPAGATION_REQUIRES_NEW`는 현재 진행중인 트랜잭션을 중단하고 새로운 커넥션으로 트랜잭션을 시작하기 때문에 `startTransaction()`로 보냅니다.
이처럼 다는 설명하지 못하지만 각 전파옵션과 현재 진행중인 트랜잭션의 유무를 판단하여 트랜잭션(상태)를 리턴합니다.

#### doBegin

```java
@Override
protected void doBegin(Object transaction, TransactionDefinition definition) {
  DataSourceTransactionObject txObject = (DataSourceTransactionObject) transaction;
  Connection con = null;

  try {
    if (!txObject.hasConnectionHolder() ||
        txObject.getConnectionHolder().isSynchronizedWithTransaction()) {
      Connection newCon = obtainDataSource().getConnection();
      if (logger.isDebugEnabled()) {
        logger.debug("Acquired Connection [" + newCon + "] for JDBC transaction");
      }
      txObject.setConnectionHolder(new ConnectionHolder(newCon), true);
    }

    txObject.getConnectionHolder().setSynchronizedWithTransaction(true);
    con = txObject.getConnectionHolder().getConnection();

    Integer previousIsolationLevel = DataSourceUtils.prepareConnectionForTransaction(con, definition);
    txObject.setPreviousIsolationLevel(previousIsolationLevel);
    txObject.setReadOnly(definition.isReadOnly());

    // Switch to manual commit if necessary. This is very expensive in some JDBC drivers,
    // so we don't want to do it unnecessarily (for example if we've explicitly
    // configured the connection pool to set it already).
    if (con.getAutoCommit()) {
      txObject.setMustRestoreAutoCommit(true);
      if (logger.isDebugEnabled()) {
        logger.debug("Switching JDBC Connection [" + con + "] to manual commit");
      }
      con.setAutoCommit(false);
    }

    prepareTransactionalConnection(con, definition);
    txObject.getConnectionHolder().setTransactionActive(true);

    int timeout = determineTimeout(definition);
    if (timeout != TransactionDefinition.TIMEOUT_DEFAULT) {
      txObject.getConnectionHolder().setTimeoutInSeconds(timeout);
    }

    // Bind the connection holder to the thread.
    if (txObject.isNewConnectionHolder()) {
      TransactionSynchronizationManager.bindResource(obtainDataSource(), txObject.getConnectionHolder());
    }
  }

  catch (Throwable ex) {
    if (txObject.isNewConnectionHolder()) {
      DataSourceUtils.releaseConnection(con, obtainDataSource());
      txObject.setConnectionHolder(null, false);
    }
    throw new CannotCreateTransactionException("Could not open JDBC Connection for transaction", ex);
  }
}
```

이 메서드는 주어진 트랜잭션 정의에따라 의미하  새로운 트랜잭션을 시작합니다. 이 추상 트랜잭션 매니저에의해 이미 처리된기 때문  전파동작을 적용하는것에 대해 걱정할 필요없습니다. 이 메소드는 트랜잭션 매니저가 실제로 새로운 트랜잭션을 시작하기로 결정할때 호출합니다. 이전 트랜잭션이 없거나, 이전트랜잭션이 중단됐거나 둘중 하나입니다.

특별한 경우는 세이브 포인트 없이 중첩된 트랜잭션 입니다. `useSavepointForNestedTransaction()`이 "false"를 리턴 한다면, 이 메소드는 필요할때 중첩된 트랜잭션을 시작을 호출합니다. 그런 흐름에, 활성트랜잭션이 있습니다. (이 메소드의 구현체는 이를 감지하고 적절한 중첩 트랜잭션을 시작해야합니다).

#### final commit(TransactionStatus status)
이 커밋 구현은 기존 트랜잭션 및 프로그래밍 방식 롤백 요청에 참여하는 것을 처리합니다. `isRollbackOnly`및 `doCommit`그리고 `rollback`에 위임합니다.

```java
@Override
	public final void commit(TransactionStatus status) throws TransactionException {
		if (status.isCompleted()) {
			throw new IllegalTransactionStateException(
					"Transaction is already completed - do not call commit or rollback more than once per transaction");
		}

		DefaultTransactionStatus defStatus = (DefaultTransactionStatus) status;
		if (defStatus.isLocalRollbackOnly()) {
			if (defStatus.isDebug()) {
				logger.debug("Transactional code has requested rollback");
			}
			processRollback(defStatus, false);
			return;
		}

		if (!shouldCommitOnGlobalRollbackOnly() && defStatus.isGlobalRollbackOnly()) {
			if (defStatus.isDebug()) {
				logger.debug("Global transaction is marked as rollback-only but transactional code requested commit");
			}
			processRollback(defStatus, true);
			return;
		}

		processCommit(defStatus);
	}
```
