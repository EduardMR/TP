package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Tarea;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Tarea entity.
 */
public interface TareaRepository extends JpaRepository<Tarea, Long> {

}
