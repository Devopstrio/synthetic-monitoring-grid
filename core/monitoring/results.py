from typing import List, Dict, Any
from datetime import datetime

class ResultAggregator:
    """Aggregates synthetic check results for visualization and reporting."""
    
    def aggregate_uptime(self, results: List[Dict[str, Any]]) -> Dict[str, Any]:
        total = len(results)
        successes = len([r for r in results if r["status"] == "SUCCESS"])
        
        uptime_pct = (successes / total * 100) if total > 0 else 100
        
        return {
            "uptime_pct": round(uptime_pct, 2),
            "total_checks": total,
            "success_count": successes,
            "failure_count": total - successes
        }

    def get_latency_stats(self, results: List[Dict[str, Any]]) -> Dict[str, Any]:
        latencies = [r["latency_ms"] for r in results if r["status"] == "SUCCESS"]
        if not latencies:
            return {"avg": 0, "p95": 0, "max": 0}
            
        return {
            "avg": round(sum(latencies) / len(latencies), 2),
            "p95": round(sorted(latencies)[int(len(latencies) * 0.95)], 2),
            "max": max(latencies)
        }
