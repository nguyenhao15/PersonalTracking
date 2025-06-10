package com.haro._5.repositories;

import com.haro._5.dtos.Dashboard.DashboardSummary;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Repository
public interface DashboardService {
    DashboardSummary getSummaryForUser(String userId);
}
