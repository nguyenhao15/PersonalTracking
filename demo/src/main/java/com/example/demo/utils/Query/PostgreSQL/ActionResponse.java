package com.example.demo.utils.Query.PostgreSQL;

public record ActionResponse(
        String label,
        String nextStatus,
        String actionType // Dùng để CSS ở Frontend
) {
}
