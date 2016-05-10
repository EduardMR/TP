package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.Tarea;
import com.mycompany.myapp.repository.TareaRepository;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import com.mycompany.myapp.web.rest.util.PaginationUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Tarea.
 */
@RestController
@RequestMapping("/api")
public class TareaResource {

    private final Logger log = LoggerFactory.getLogger(TareaResource.class);

    @Inject
    private TareaRepository tareaRepository;

    /**
     * POST  /tareas -> Create a new tarea.
     */
    @RequestMapping(value = "/tareas",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Tarea> createTarea(@Valid @RequestBody Tarea tarea) throws URISyntaxException {
        log.debug("REST request to save Tarea : {}", tarea);
        if (tarea.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("tarea", "idexists", "A new tarea cannot already have an ID")).body(null);
        }
        Tarea result = tareaRepository.save(tarea);
        return ResponseEntity.created(new URI("/api/tareas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("tarea", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tareas -> Updates an existing tarea.
     */
    @RequestMapping(value = "/tareas",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Tarea> updateTarea(@Valid @RequestBody Tarea tarea) throws URISyntaxException {
        log.debug("REST request to update Tarea : {}", tarea);
        if (tarea.getId() == null) {
            return createTarea(tarea);
        }
        Tarea result = tareaRepository.save(tarea);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("tarea", tarea.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tareas -> get all the tareas.
     */
    @RequestMapping(value = "/tareas",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<List<Tarea>> getAllTareas(Pageable pageable)
        throws URISyntaxException {
        log.debug("REST request to get a page of Tareas");
        Page<Tarea> page = tareaRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/tareas");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /tareas/:id -> get the "id" tarea.
     */
    @RequestMapping(value = "/tareas/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Tarea> getTarea(@PathVariable Long id) {
        log.debug("REST request to get Tarea : {}", id);
        Tarea tarea = tareaRepository.findOne(id);
        return Optional.ofNullable(tarea)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /tareas/:id -> delete the "id" tarea.
     */
    @RequestMapping(value = "/tareas/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteTarea(@PathVariable Long id) {
        log.debug("REST request to delete Tarea : {}", id);
        tareaRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("tarea", id.toString())).build();
    }
}
