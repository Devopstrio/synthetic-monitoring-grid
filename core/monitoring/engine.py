import time
import uuid
import requests
from typing import List, Dict, Any, Optional
from datetime import datetime

class SyntheticExecutionEngine:
    """Executes synthetic checks (HTTP/API) across distributed agents."""
    
    def execute_http_check(self, check_definition: Dict[str, Any]) -> Dict[str, Any]:
        url = check_definition.get("url")
        method = check_definition.get("method", "GET")
        headers = check_definition.get("headers", {})
        expected_status = check_definition.get("expected_status", 200)
        
        start_time = time.time()
        try:
            # Simulation: In a real world we'd use requests or playwright
            response = requests.request(
                method=method,
                url=url,
                headers=headers,
                timeout=check_definition.get("timeout", 10)
            )
            latency_ms = (time.time() - start_time) * 1000
            
            success = response.status_code == expected_status
            return {
                "check_id": check_definition.get("id"),
                "status": "SUCCESS" if success else "FAILURE",
                "status_code": response.status_code,
                "latency_ms": round(latency_ms, 2),
                "timestamp": datetime.utcnow().isoformat(),
                "error": None if success else f"Status code mismatch: {response.status_code} != {expected_status}"
            }
        except Exception as e:
            return {
                "check_id": check_definition.get("id"),
                "status": "ERROR",
                "status_code": 0,
                "latency_ms": 0,
                "timestamp": datetime.utcnow().isoformat(),
                "error": str(e)
            }

class CheckScheduler:
    """Schedules synthetic checks based on cron or frequency."""
    
    def get_pending_checks(self) -> List[Dict[str, Any]]:
        # Simulation: In real world we'd query DB for checks due to run
        return [
            {"id": "api-health", "url": "https://api.example.com/health", "frequency": 60, "region": "us-east-1"},
            {"id": "web-home", "url": "https://example.com", "frequency": 300, "region": "eu-west-1"}
        ]

class AlertEngine:
    """Evaluates check results against thresholds and triggers alerts."""
    
    def evaluate_results(self, result: Dict[str, Any], policy: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        threshold = policy.get("latency_threshold_ms", 1000)
        
        if result["status"] != "SUCCESS":
            return {
                "alert_id": str(uuid.uuid4()),
                "type": "AVAILABILITY_FAILURE",
                "severity": "CRITICAL",
                "message": f"Check {result['check_id']} failed in {result.get('region', 'global')}.",
                "timestamp": datetime.utcnow().isoformat()
            }
            
        if result["latency_ms"] > threshold:
            return {
                "alert_id": str(uuid.uuid4()),
                "type": "LATENCY_BREACH",
                "severity": "WARNING",
                "message": f"Check {result['check_id']} exceeded latency threshold: {result['latency_ms']}ms > {threshold}ms",
                "timestamp": datetime.utcnow().isoformat()
            }
            
        return None

class CorrelationEngine:
    """Correlates multiple failures to identify regional or global outages."""
    
    def analyze_patterns(self, results: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        region_failures = {}
        for r in results:
            if r["status"] == "FAILURE":
                region = r.get("region", "unknown")
                region_failures[region] = region_failures.get(region, 0) + 1
                
        outages = []
        for region, count in region_failures.items():
            if count > 2: # Threshold for regional outage detection
                outages.append({
                    "type": "REGIONAL_OUTAGE",
                    "region": region,
                    "impact_count": count,
                    "timestamp": datetime.utcnow().isoformat()
                })
        return outages

if __name__ == "__main__":
    # Test Simulation
    engine = SyntheticExecutionEngine()
    evaluator = AlertEngine()
    correlator = CorrelationEngine()
    
    print("--- Synthetic Monitoring Grid Simulation ---")
    
    # 1. Execute Check
    check = {"id": "test-check", "url": "https://httpstat.us/200", "expected_status": 200}
    res = engine.execute_http_check(check)
    print(f"[EXEC] Result: {res['status']} | Latency: {res['latency_ms']}ms")
    
    # 2. Evaluate Alert
    policy = {"latency_threshold_ms": 50} # Aggressive threshold for test
    alert = evaluator.evaluate_results(res, policy)
    if alert:
        print(f"[ALERT] {alert['type']}: {alert['message']}")
    
    # 3. Correlation
    failures = [
        {"status": "FAILURE", "region": "us-east-1"},
        {"status": "FAILURE", "region": "us-east-1"},
        {"status": "FAILURE", "region": "us-east-1"}
    ]
    patterns = correlator.analyze_patterns(failures)
    for p in patterns:
        print(f"[CORRELATION] {p['type']} detected in {p['region']}!")
