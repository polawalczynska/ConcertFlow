package com.concertflow.api.approval.entity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ApprovalRepository extends JpaRepository<Approval, Long> {
    List<Approval> findByApprover_Id(Long approverId);
    
    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query("UPDATE Approval a SET a.approver = null WHERE a.approver.id = :approverId")
    void nullifyApproverByApproverId(@Param("approverId") Long approverId);
}
