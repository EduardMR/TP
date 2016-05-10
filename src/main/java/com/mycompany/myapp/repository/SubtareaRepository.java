package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Subtarea;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Subtarea entity.
 */
public interface SubtareaRepository extends JpaRepository<Subtarea, Long> {

}
