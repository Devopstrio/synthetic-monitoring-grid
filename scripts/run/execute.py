import sys
import time
import random
from core.monitoring.engine import SyntheticExecutionEngine, CheckScheduler, AlertEngine, CorrelationEngine

def run_synthetic_simulation():
    # 1. Initialize Engines
    engine = SyntheticExecutionEngine()
    scheduler = CheckScheduler()
    alert_manager = AlertEngine()
    correlator = CorrelationEngine()
    
    print("--- Synthetic Monitoring Grid Platform Simulation ---")
    
    # 2. Simulate Check Discovery
    print(f"\n[SCHEDULER] Discovering checks due for execution...")
    pending = scheduler.get_pending_checks()
    print(f"  Found {len(pending)} checks scheduled for this window.")
    
    # 3. Simulate Distributed Execution
    print(f"\n[EXECUTION] Dispatching checks to regional agents...")
    results = []
    for check in pending:
        # Mock execution
        print(f"  Running check '{check['id']}' from region '{check['region']}'...")
        res = engine.execute_http_check(check)
        
        # Inject simulated failure for demonstration
        if check['id'] == 'api-health':
            res['status'] = 'FAILURE'
            res['latency_ms'] = 5000
            
        results.append(res)
        print(f"    >>> Result: {res['status']} | Latency: {res['latency_ms']}ms")
        
    # 4. Evaluate Alerts
    print(f"\n[ALERTS] Evaluating results against SLA thresholds...")
    policy = {"latency_threshold_ms": 1000}
    for r in results:
        alert = alert_manager.evaluate_results(r, policy)
        if alert:
            print(f"  !!! ALERT: {alert['type']} on {r['check_id']} | {alert['message']}")
            
    # 5. Correlate Failures
    print(f"\n[CORRELATION] Analyzing global patterns for regional outages...")
    # Inject more failures for correlation
    mock_failures = results + [
        {"status": "FAILURE", "region": "us-east-1", "check_id": "auth-svc"},
        {"status": "FAILURE", "region": "us-east-1", "check_id": "billing-svc"}
    ]
    outages = correlator.analyze_patterns(mock_failures)
    for o in outages:
        print(f"  >>> PATTERN DETECTED: {o['type']} in {o['region']}!")

if __name__ == "__main__":
    run_synthetic_simulation()
