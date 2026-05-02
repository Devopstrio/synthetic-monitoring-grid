module "synthetic_db" {
  source = "./modules/database"

  db_name = "synthetic_monitoring_metadata"
}

module "scheduler_cache" {
  source = "./modules/redis"

  cluster_mode = true
}

module "grid_monitoring" {
  source = "./modules/monitoring"

  retention_days = 90
}

resource "kubernetes_namespace" "synthetic_ops" {
  metadata {
    name = "synthetic-monitoring-grid"
    labels = {
      "observability.ops/managed" = "true"
    }
  }
}

resource "kubernetes_config_map" "grid_configs" {
  metadata {
    name      = "synthetic-global-configs"
    namespace = kubernetes_namespace.synthetic_ops.metadata[0].name
  }

  data = {
    "execution-timeout" = "30s"
    "max-parallel-checks" = "500"
    "retry-strategy"      = "exponential-backoff"
    "alert-aggregation"   = "enabled"
  }
}
