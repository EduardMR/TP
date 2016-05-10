package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.Application;
import com.mycompany.myapp.domain.Subtarea;
import com.mycompany.myapp.repository.SubtareaRepository;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;

import static org.hamcrest.Matchers.hasItem;

import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


/**
 * Test class for the SubtareaResource REST controller.
 *
 * @see SubtareaResource
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
@WebAppConfiguration
@IntegrationTest
public class SubtareaResourceIntTest {

    private static final String DEFAULT_NOMBRE = "AAAAA";
    private static final String UPDATED_NOMBRE = "BBBBB";
    private static final String DEFAULT_DESCRIPCION = "AAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBB";

    @Inject
    private SubtareaRepository subtareaRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    private MockMvc restSubtareaMockMvc;

    private Subtarea subtarea;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        SubtareaResource subtareaResource = new SubtareaResource();
        ReflectionTestUtils.setField(subtareaResource, "subtareaRepository", subtareaRepository);
        this.restSubtareaMockMvc = MockMvcBuilders.standaloneSetup(subtareaResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    @Before
    public void initTest() {
        subtarea = new Subtarea();
        subtarea.setNombre(DEFAULT_NOMBRE);
        subtarea.setDescripcion(DEFAULT_DESCRIPCION);
    }

    @Test
    @Transactional
    public void createSubtarea() throws Exception {
        int databaseSizeBeforeCreate = subtareaRepository.findAll().size();

        // Create the Subtarea

        restSubtareaMockMvc.perform(post("/api/subtareas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subtarea)))
            .andExpect(status().isCreated());

        // Validate the Subtarea in the database
        List<Subtarea> subtareas = subtareaRepository.findAll();
        assertThat(subtareas).hasSize(databaseSizeBeforeCreate + 1);
        Subtarea testSubtarea = subtareas.get(subtareas.size() - 1);
        assertThat(testSubtarea.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testSubtarea.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
    }

    @Test
    @Transactional
    public void checkNombreIsRequired() throws Exception {
        int databaseSizeBeforeTest = subtareaRepository.findAll().size();
        // set the field null
        subtarea.setNombre(null);

        // Create the Subtarea, which fails.

        restSubtareaMockMvc.perform(post("/api/subtareas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subtarea)))
            .andExpect(status().isBadRequest());

        List<Subtarea> subtareas = subtareaRepository.findAll();
        assertThat(subtareas).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSubtareas() throws Exception {
        // Initialize the database
        subtareaRepository.saveAndFlush(subtarea);

        // Get all the subtareas
        restSubtareaMockMvc.perform(get("/api/subtareas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.[*].id").value(hasItem(subtarea.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())));
    }

    @Test
    @Transactional
    public void getSubtarea() throws Exception {
        // Initialize the database
        subtareaRepository.saveAndFlush(subtarea);

        // Get the subtarea
        restSubtareaMockMvc.perform(get("/api/subtareas/{id}", subtarea.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").value(subtarea.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSubtarea() throws Exception {
        // Get the subtarea
        restSubtareaMockMvc.perform(get("/api/subtareas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSubtarea() throws Exception {
        // Initialize the database
        subtareaRepository.saveAndFlush(subtarea);

        int databaseSizeBeforeUpdate = subtareaRepository.findAll().size();

        // Update the subtarea
        subtarea.setNombre(UPDATED_NOMBRE);
        subtarea.setDescripcion(UPDATED_DESCRIPCION);

        restSubtareaMockMvc.perform(put("/api/subtareas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subtarea)))
            .andExpect(status().isOk());

        // Validate the Subtarea in the database
        List<Subtarea> subtareas = subtareaRepository.findAll();
        assertThat(subtareas).hasSize(databaseSizeBeforeUpdate);
        Subtarea testSubtarea = subtareas.get(subtareas.size() - 1);
        assertThat(testSubtarea.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testSubtarea.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
    }

    @Test
    @Transactional
    public void deleteSubtarea() throws Exception {
        // Initialize the database
        subtareaRepository.saveAndFlush(subtarea);

        int databaseSizeBeforeDelete = subtareaRepository.findAll().size();

        // Get the subtarea
        restSubtareaMockMvc.perform(delete("/api/subtareas/{id}", subtarea.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Subtarea> subtareas = subtareaRepository.findAll();
        assertThat(subtareas).hasSize(databaseSizeBeforeDelete - 1);
    }
}
